//https://snack.expo.dev/@sugarexpo/380485

import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { BiteShareContext } from '../../BiteShareContext';
import { addANewAnonymousDocument, readDocSnapshotListener, getADocReferenceFromCollection, updateADocument } from '../../../firebase/helpers/database.firebase';
import { Timestamp } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import GuestMenu from './GuestMenu';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
export default function QRScanner() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { state:
    { restaurantName, restaurantId, nickname, accountHolderName, accountType, openCamera, joinRequest, userId }, dispatch }
    = useContext(BiteShareContext);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const listenToDBForJoinRequest = (transactionId, guestId, hostName) => {
    const unsubscribe = readDocSnapshotListener(`transactions/${transactionId}/attendees`, guestId, (newdoc) => {
      const docData = newdoc.data();
      if (docData.joinRequest === 'pending') {
        dispatch({ type: 'SET_JOIN_REQUEST', joinRequest: 'pending' });
      } else if (docData.joinRequest === 'allowed') {
        dispatch({ type: 'SET_JOIN_REQUEST', joinRequest: 'allowed' });
        dispatch({ type: 'SET_ACCOUNT_TYPE', accountType: 'GUEST' });
        navigation.navigate('CurrentSession', {previous: 'coming from join tab'});
        unsubscribe();
      } else {
        setScanned(false);
        navigation.navigate('Explore', {previous: 'coming from join tab'});
        alert(`Access denied.\n Please contact your host ${hostName} to try again`);
        dispatch({ type: 'SET_CLEAR_CONTEXT' });
        unsubscribe();
      }
    });
  };

  const handleBarCodeScanned = ({ type, data }) => {

    setScanned(true);
    //Once it it scanned, turn off the camera
    dispatch({ type: 'SET_OPEN_CAMERA', openCamera: false });
    //Setting accountType to pending to show the menu while waiting
    dispatch({ type: 'SET_ACCOUNT_TYPE', accountType: 'PENDING' });

    alert('Please wait until the host allows you to join the session');

    const sessionData = data.split('&');
    const [ sessionId, hostName, diningPlaceName, diningPlaceId ] = sessionData;

    dispatch({type: 'SET_SESSION_ID', sessionId: sessionId});
    dispatch({ type: 'SET_RESTAURANT_ID', restaurantId: diningPlaceId });
    dispatch({ type: 'SET_RESTAURANT_NAME', restaurantName: diningPlaceName });

    getADocReferenceFromCollection(`transactions/${sessionId}/attendees`, 'userId', '==', userId)
      .then((qResult) => {
        if (!qResult.empty) {
          qResult.forEach((doc) => {
            updateADocument(`transactions/${sessionId}/attendees`, doc.id, {
              joinRequest: 'pending',
            })
              .then(() => {
                listenToDBForJoinRequest(sessionId, doc.id, hostName);
              });
          });
        } else {
          addANewAnonymousDocument(`transactions/${sessionId}/attendees`, {
            joinRequest: 'pending',
            isHost: false,
            individualBills: 0,
            name: nickname || accountHolderName, //Get userName from google
            orderStatus: 'not ready',
            orderedItems: [],
            userId: userId,
          })
            .then((guestDoc) => {
              console.log('Successfully added GUEST into the database');
              listenToDBForJoinRequest(sessionId, guestDoc.id, hostName);
            });
        }
      })
      .then(() => {
        addANewAnonymousDocument(`users/${userId}/transactions`, {
          sessionId: sessionId,
          isCurrent: true,
          individualBills: 0,
          date: Timestamp.fromDate(new Date()),
          role: 'GUEST',
        })
          .then(() => {
            console.log('Successfully added the transaction for current user');
          })
          .catch((error) => {
            console.log('Error adding the transaction for current user');
          });
      })
      .catch((error) => {
        console.log('Error when adding GUEST into the database');
      });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>

      {scanned === true && accountType === 'PENDING' && <GuestMenu /> }

      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />


    </View>
  );
}


