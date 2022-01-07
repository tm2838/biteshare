import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { BiteShareContext } from '../../../BiteShareContext.js';
import { colors } from '../../../infrastructure/colors.js';
import { fonts } from '../../../infrastructure/fonts.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.brand.body,
    alignItems: 'center',
    justifyContent: 'center',

  },
  baseText: {
    fontFamily: fonts.body,
    height: 80,
    fontSize: 25,
    paddingTop: 40,
    color: colors.brand.darkBlue
  },

});

const HostQR = () => {
  const { state: { sessionId, accountHolderName, restaurantName, restaurantId }, dispatch } = useContext(BiteShareContext);
  //also pass in resturant name
  const sessionInfoString = `${sessionId}&${accountHolderName}&${restaurantName}&${restaurantId}`;

  return (

    <View style={styles.container}>

      <QRCode
        value={sessionInfoString}
        color={colors.brand.darkBlue}
        size={150}
        logoMargin={2}
        logoSize={80}
        logoBorderRadius={10}
        logoBackgroundColor={'transparent'}
      />

      <Text style={styles.baseText}>
        Scan to join a session
      </Text>
    </View>

  );
};


export default HostQR;

