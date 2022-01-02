//https://snack.expo.dev/@sugarexpo/380485

import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { addANewAnonymousDocument, readDocSnapshotListener } from '../../../firebase/helpers/database.firebase';
import { useNavigation } from '@react-navigation/native';
import { BiteShareContext } from '../../BiteShareContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
export default function GuestQR() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();
  const { state: { }, dispatch } = useContext(BiteShareContext);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    let sampleData = data.split('&');
    let hostName = sampleData[1];
    let sessionId = sampleData[0];
    // alert(`Session Id: ${sessionId} \n  HostName: ${hostName}`);
    dispatch({type: 'SET_SESSION_ID', sessionId: sessionId});
    dispatch({ type: 'SET_ACCOUNT_TYPE', accountType: 'GUEST' });
    addANewAnonymousDocument(`transactions/${sessionId}/attendees`, {
      joinRequest: 'pending',
      isHost: false,
      individualBills: 0,
      name: 'Tom',
      orderStatus: 'not ready',
      orderedItems: [],

    })
      .then((doc) => {
        console.log('Successfully added GUEST into the database');
        alert('Please wait until the host allows you to join the session');
        const unsubscribe = readDocSnapshotListener(`transactions/${sessionId}/attendees`, doc.id, (doc) => {
          const docData = doc.data();
          if (docData.joinRequest === 'allowed') {
            navigation.navigate('CurrentSession', {previous: 'coming from join tab'});
            unsubscribe();
          }
        });
      })
      .catch((error) => {
        console.log('Error when adding GUEST into the database');
      });

    //***********@TODO----Once we get the  information----************
    // HOST needs to be updated with guest name - in real time (firestore)
    // HOST will get notification (current session -> summary )that someone wants to join the session?
    // After HOST 'allow' the guest entry, update in real time (firestore snapshot), update conetxt api under guest[{name:Greg}]
    // Guest get confirmation update ('waiting' -> 'allowed'), redirect to the (current -> menu)

  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}


