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
    marginTop: 20,
    
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
  const { state: { accountId, accountHolderName, restaurantName }, dispatch } = useContext(BiteShareContext);
  //also pass in resturant name
  const someString = `${accountId}&${accountHolderName}&${restaurantName}`;

  return (

    <View style={styles.container}>

      <QRCode
        value={someString}
        color={colors.brand.darkBlue}
        size={150}
        //  logo={require('../../../embed_logo_file_path')} // or logo={{uri: base64logo}}
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

