import React, { useState, useContext } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { BiteShareContext } from '../BiteShareContext';
import { colors } from '../infrastructure/colors';
import { signOutUser } from '../../firebase/helpers/authentication.firebase';
import { deleteADocument, getADocReferenceFromCollection, updateADocument } from '../../firebase/helpers/database.firebase';

const LogoutModal = ({ modalVisible, setModalVisible }) => {
  const {
    state: {
      // isEveryoneReady,
      // splitMethod,
      // totalBill,
      guests,
      // restaurants,
      // restaurantsImages,
      // restaurantName,
      // restaurantId,
      // restaurantMenus,
      // accountHolderName,
      accountType,
      sessionId,
      // orderedItems,
      // email,
      // authenticated,
      // biteShareKey,
      nickname,
    }, dispatch } = useContext(BiteShareContext);

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

  const resetContext = () => {
    dispatch({ type: 'SET_ORDER_STATUS', isEveryoneReady: false });
    dispatch({ type: 'SET_SPLIT_METHOD', splitMethod: '' });
    dispatch({ type: 'SET_TOTAL_BILL', totalBill: 0 });
    dispatch({ type: 'SET_GUESTS', guests: [] });
    dispatch({ type: 'SET_RESTAURANTS', restaurants: [] });
    dispatch({ type: 'SET_RESTAURANTS_IMAGES', restaurantsImages: [] });
    dispatch({ type: 'SET_RESTAURANT_NAME', restaurantName: '' });
    dispatch({ type: 'SET_RESTAURANT_INFO', restaurantId: null });
    dispatch({ type: 'SET_RESTAURANT_MENU', restaurantMenus: [] });
    dispatch({ type: 'SET_ACCOUNT_HOLDER_NAME', accountHolderName: '' });
    dispatch({ type: 'SET_ACCOUNT_TYPE', accountType: '' });
    dispatch({ type: 'SET_SESSION_ID', sessionId: '' });
    dispatch({ type: 'SET_ORDER_ITEMS', orderedItems: [] });
    dispatch({ type: 'SET_EMAIL', email: '' });
    dispatch({ type: 'SET_BITESHARE_KEY', biteShareKey: '9dc8a2f81caddc80fddc41a188a4d7f1' });
    dispatch({ type: 'SET_NICKNAME', nickname: null });
  };

  const logout = () => {
    console.log('wheat', sessionId, accountType);
    if (sessionId && accountType === 'HOST') {
      deleteADocument('transactions', sessionId)
        .then((success) => {
          console.log('deleted transaction with host', success);
        })
        .catch((error) => {
          console.log('Error denying the guest: ', error);
        });
    } else if (sessionId && accountType === 'GUEST') {
      getADocReferenceFromCollection(`transactions/${sessionId}/attendees`, 'name', '==', nickname)
        .then(qResult => {
          console.log('my q result NUMBER 2', qResult);
          qResult.forEach((doc) => {
            console.log('this is one DOC:', doc.data());
            // updateADocument(`transactions/${sessionId}/attendees`, {
            //   joinRequest: 'denied'
            // });
          });
        })
        .catch((error) => {
          console.log('Error denying the guest: ', error);
        });
    }
    signOutUser()
      .then(() => {
        resetContext();
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
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
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