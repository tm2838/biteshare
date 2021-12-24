import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  qrCodeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const CurrentSessionQRCode = ({ changeTab }) => {
  return (
    <View style = {styles.qrCodeContainer}>
      <Text>This is QR Code Screen.</Text>
    </View>
  );
};

export default CurrentSessionQRCode;