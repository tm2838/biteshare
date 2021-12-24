//https://snack.expo.dev/@sugarexpo/380485
import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { BiteShareContext } from '../../BiteShareContext.js';
import { colors } from '../../infrastructure/colors.js';
import { fonts } from '../../infrastructure/fonts.js';
import BiteshareButton from '../../components/BiteshareButton.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 300,
  },
  baseText: {
    marginTop: 250,
    fontSize: 25,
    textAlign: 'center',
    height: 50,
    fontFamily: fonts.body,
    color: colors.brand.darkBlue
  }
});




//   //button allow user to click {on press} - useBiteshare button
//   //go to this QRScan function to scan the bar code
//   //
//   //tab navaigt
// };


const GuestQR = () => {
  const scanQR = '../../../assets/scanQR.png';
  const { state: { accountId, accountHolderName, restaurantName}, dispatch } = useContext(BiteShareContext);



  const QRScan = () => {
    console.log('hello Ready to scan');
    alert(`Acccount Id: ${accountId} \n HostName:${accountHolderName} \n restaurant Name: ${restaurantName}`);

    /*****  https://snack.expo.dev/@sugarexpo/380485
    * This following code works while using on expo.
    * Will need to revisit again during the implementation
    *
    *
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

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
      let restaurantName = sampleData[2];

      alert(`Session Id: ${sessionId} & Host Name: ${hostName} &  restaurant Name : ${restaurantName}`);

      //***********@TODO----Once we get the  information----************
      // HOST needs to be updated with guest name - in real time (websocket io?)
      // HOST will get notification (current session -> summary )that someone wants to join the session?
      // After HOST 'allow' the guest entry, update in real time (websocket io?), update conetxt api under guest[{name:Greg}]
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

    */

  };

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity = { .5 } onPress={ QRScan }>
        <Image
          source = {require(scanQR)}
        />
      </TouchableOpacity>
      <Text style={styles.baseText}>Scan QR code to join</Text>

    </View>
  );
};

export default GuestQR;



