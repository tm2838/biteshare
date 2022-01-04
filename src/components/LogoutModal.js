import React, { useState, useContext } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { BiteShareContext } from '../BiteShareContext';
import { colors } from '../infrastructure/colors';
import { signOutUser } from '../../firebase/helpers/authentication.firebase';
import { deleteADocument } from '../../firebase/helpers/database.firebase';

const LogoutModal = ({ modalVisible, setModalVisible }) => {
  const { state: { authenticated, sessionId, accountType, nickname }, dispatch } = useContext(BiteShareContext);
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

  const logout = () => {
    console.log('wheat', sessionId, accountType);
    if (sessionId && accountType === 'HOST') {
      deleteADocument('transactions', sessionId)
        .then(qResult => {
          console.log('my q result', qResult);
        })
        .catch((error) => {
          console.log('Error denying the guest: ', error);
        });
    } else if (sessionId && accountType === 'GUEST') {
      getADocReferenceFromCollection(`transactions/${sessionId}/attendees`, 'name', '==', nickname)
        .then((qResult) => {
          qResult.forEach((doc) => {
            updateADocument(`transactions/${sessionId}/attendees`, doc.id, {
              joinRequest: 'denied'
            });
          });
        })
        .catch((error) => {
          console.log('Error denying the guest: ', error);
        });
    } else {
      signOutUser()
        .then(() => {
          navigation.navigate('Login');
        })
        .catch(err => {
          console.log(err);
        });
      // dispatch({ type: 'SET_AUTH', authenticated: false });
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {sessionId
                ? 'This will end current session. Would you like to proceed?'
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