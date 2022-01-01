//https://snack.expo.dev/@sugarexpo/380485

<<<<<<< HEAD
import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { addANewAnonymousDocument, readDocSnapshotListener } from '../../../firebase/helpers/database.firebase';
import { useNavigation } from '@react-navigation/native';
import { BiteShareContext } from '../../BiteShareContext';
=======
import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { BiteShareContext } from '../../BiteShareContext';
import GuestMenu from './GuestMenu';
>>>>>>> 6732b0ccd17cc6f9584a22e1e7a51b9da42c3005

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
export default function QRScanner(navigation) {
  console.log('GUEST QR---->', navigation);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
<<<<<<< HEAD
  const navigation = useNavigation();
  const { state: { }, dispatch } = useContext(BiteShareContext);
=======
  const { state:
    { restaurantName, restaurantId, restaurantMenus}, dispatch }
    = useContext(BiteShareContext);

  console.log('RestsurantID----------->', restaurantId);
>>>>>>> 6732b0ccd17cc6f9584a22e1e7a51b9da42c3005

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {


    setScanned(true);
    let sampleData = data.split('&');
    //{sessionId}&${accountHolderName}&${restaurantName}
    //1234567&Susan$Pizza&777777779998877666
    let sessionId = sampleData[0];
<<<<<<< HEAD
    // alert(`Session Id: ${sessionId} \n  HostName: ${hostName}`);
    dispatch({type: 'SET_SESSION_ID', sessionId: sessionId});
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
=======
    let hostName = sampleData[1];
    let diningPlaceName = sampleData[2];
    let diningPlaceId = sampleData[3];
>>>>>>> 6732b0ccd17cc6f9584a22e1e7a51b9da42c3005

    alert(`Session Id: ${sessionId} \n  HostName: ${hostName} \n
    Restaurant Name: ${diningPlaceName} \n RestaurantID: ${diningPlaceId}` );
    dispatch({ type: 'SET_RESTAURANT_ID', restaurantId: diningPlaceId });
    dispatch({ type: 'SET_RESTAURANT_NAME', restaurantName: diningPlaceName });
    //document ID- from query****
    //***********@TODO----Once we get the  information----************
    // HOST needs to be updated with guest name - in real time (firestore)
    // HOST will get notification (current session -> summary )that someone wants to join the session?
    // After HOST 'allow' the guest entry, update in real time (firestore snapshot), update conetxt api under guest[{name:Greg}]
    // Guest get confirmation update ('waiting' -> 'allowed'), redirect to the (current -> menu)
<<<<<<< HEAD

=======
    if (scanned) {
      return;
    }
  };

  const reRoute = async()=>{
    await delay(500);
>>>>>>> 6732b0ccd17cc6f9584a22e1e7a51b9da42c3005
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {scanned === true ? <GuestMenu navigation={navigation}/> :
        <BarCodeScanner
          onBarCodeScanned={scanned ? reRoute : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      }


      {/* {scanned && <ExploreMenu />} */}
    </View>
  );
}


