//https://snack.expo.dev/@sugarexpo/380485

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
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
    alert(`Session Id: ${sessionId} \n  HostName: ${hostName}`);

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


