//https://snack.expo.dev/@sugarexpo/380485

import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { BiteShareContext } from '../../BiteShareContext';
import { addANewAnonymousDocument, readDocSnapshotListener } from '../../../firebase/helpers/database.firebase';
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
  const [denied, setDenied] = useState(true);
  const { state:
    { restaurantName, restaurantId, restaurantMenus, nickname, accountHolderName, joinRequest }, dispatch }
    = useContext(BiteShareContext);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {

    setScanned(true);

    let sampleData = data.split('&');
    let sessionId = sampleData[0];
    let hostName = sampleData[1];
    let diningPlaceName = sampleData[2];
    let diningPlaceId = sampleData[3];

    dispatch({type: 'SET_SESSION_ID', sessionId: sessionId});
    dispatch({ type: 'SET_RESTAURANT_ID', restaurantId: diningPlaceId });
    dispatch({ type: 'SET_RESTAURANT_NAME', restaurantName: diningPlaceName });
    dispatch({ type: 'SET_ACCOUNT_TYPE', accountType: 'GUEST' });

    addANewAnonymousDocument(`transactions/${sessionId}/attendees`, {
      joinRequest: 'pending',
      isHost: false,
      individualBills: 0,
      name: nickname || accountHolderName, //Get userName from google
      orderStatus: 'not ready',
      orderedItems: [],

    })
      .then((doc) => {
        console.log('Successfully added GUEST into the database');
        const unsubscribe = readDocSnapshotListener(`transactions/${sessionId}/attendees`, doc.id, (doc) => {
          const docData = doc.data();
          if (docData.joinRequest === 'pending') {
            dispatch({ type: 'SET_JOIN_REQUEST', joinRequest: 'pending' });
          } else if (docData.joinRequest === 'allowed') {
            setDenied(false);
            dispatch({ type: 'SET_JOIN_REQUEST', joinRequest: 'allowed' });
            navigation.navigate('CurrentSession', {previous: 'coming from join tab'});
            unsubscribe();
          } else {
            setDenied(true);
            setScanned(false);
            navigation.navigate('Explore', {previous: 'coming from join tab'});
            dispatch({ type: 'SET_JOIN_REQUEST', joinRequest: '' });
            dispatch({type: 'SET_SESSION_ID', sessionId: ''});
            dispatch({ type: 'SET_RESTAURANT_ID', restaurantId: '' });
            dispatch({ type: 'SET_RESTAURANT_NAME', restaurantName: '' });
            dispatch({ type: 'SET_ACCOUNT_TYPE', accountType: '' });
          }
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

      {(joinRequest === 'pending') ? <GuestMenu /> :
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      }
    </View>
  );
}


