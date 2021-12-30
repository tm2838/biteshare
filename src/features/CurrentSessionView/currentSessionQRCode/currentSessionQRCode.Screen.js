import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HostQR from './HostQR';
const styles = StyleSheet.create({
  qrCodeContainer: {
    flex: 1,
  }
});

const CurrentSessionQRCode = ({ changeTab }) => {
  return (
    <View style = {styles.qrCodeContainer}>
      <HostQR />
    </View>
  );
};

export default CurrentSessionQRCode;