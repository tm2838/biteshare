import React, { useState, useContext } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { BiteShareContext, biteShareState } from '../BiteShareContext';
import { colors } from '../infrastructure/colors';
import { signOutUser } from '../../firebase/helpers/authentication.firebase';
import { deleteADocument, getADocReferenceFromCollection, updateADocument, getAllDocuments } from '../../firebase/helpers/database.firebase';

const LogoutModal = ({ modalVisible, setModalVisible }) => {
  const { state: { guests, accountType, sessionId, nickname }, dispatch } = useContext(BiteShareContext);
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: colors.brand.login,
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      width: 100,
      elevation: 2
    },
    buttonLogout: {
      backgroundColor: colors.brand.kazan,
      marginBottom: 10
    },
    logout: {
      color: 'white'
    },
    buttonClose: {
      backgroundColor: colors.brand.beach,
    },
    textStyle: {
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    modalText: {
      fontSize: 16,
      marginBottom: 15,
      textAlign: 'center'
    }
  });

  const logout = async () => {
    console.log('logout Data', sessionId, accountType);
    if (sessionId && accountType === 'HOST') {
      try {
        const qResult = await getADocReferenceFromCollection(`transactions/${sessionId}/attendees`, 'name', '==', nickname);
        qResult.forEach((doc) => {
          // console.log('DOCSSS', doc.data());
          updateADocument(`transactions/${sessionId}/attendees`, doc.id, {
            isSessionActive: false
          });
        });
        const getAttendees = await getAllDocuments(`transactions/${sessionId}/attendees`);
        getAttendees.forEach(async (attendee) => {
          await updateADocument(`transactions/${sessionId}/attendees`, attendee.id, {
            joinRequest: 'denied'
          });
        });
        await deleteADocument('transactions', sessionId);
      } catch (err) {
        console.log('Error denying the host: ', err);
      }
    } else if (sessionId && accountType === 'GUEST') {
      try {
        const qResult = await getADocReferenceFromCollection(`transactions/${sessionId}/attendees`, 'name', '==', nickname || accountHolderName);
        qResult.forEach((doc) => {
          console.log('Guest has left');
          updateADocument(`transactions/${sessionId}/attendees`, doc.id, {
            joinRequest: 'denied',
          });
        });
      } catch (err) {
        console.log('Error denying the guest: ', err);
      }
    }
    signOutUser()
      .then(() => {
        dispatch({ type: 'SET_CLEAR_CONTEXT' });
        navigation.navigate('Login');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {sessionId
                ? 'This will end your current session. Would you like to proceed?'
                : 'Are you sure you want to log out?'}
            </Text>
            <Pressable
              style={[styles.button, styles.buttonLogout]}
              onPress={() => {
                setModalVisible(!modalVisible);
                logout();
              }}
            >
              <Text style={[styles.textStyle, styles.logout]}>Logout</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LogoutModal;