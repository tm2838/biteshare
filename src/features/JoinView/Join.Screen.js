import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import SafeArea from '../../components/SafeArea';
import GuestQR from './GuestQR.js';
import JoinScreenHeader from './JoinScreenHeader';
import { colors } from '../../infrastructure/colors';
import { fonts } from '../../infrastructure/fonts';
import { BiteShareContext } from '../../BiteShareContext';
import GuestMenu from './GuestMenu';

const styles = StyleSheet.create({
  joinContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 200
  },
  messageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 300,
  },
  messageText: {
    textAlign: 'center',
    fontFamily: fonts.heading,
    height: 50,
    fontSize: 20,
  },
  navigationText: {
    textAlign: 'center',
    fontSize: 15,
    color: colors.brand.rausch
  }
});

const JoinScreen = ({ route, navigation }) => {
  const scanQrCodeImage = '../../../assets/qr-code-image.png';
  const { state: { accountType, openCamera }, dispatch } = useContext(BiteShareContext);

  //QR code will NOT show if you are a HOST
  return (
    <SafeArea>
      <JoinScreenHeader/>

      {/* If user waiting - show menu */}
      {
        accountType === 'PENDING' &&
        (<View>
          <GuestMenu />
        </View>)
      }

      {/* If user is host OR guest */}
      { (accountType === 'GUEST' || accountType === 'HOST') &&

        (<View style={styles.messageContainer}>
          <Text style={styles.messageText}>You are currently a <Text style={{ color: colors.brand.rausch }}>{`${accountType}`}</Text></Text>
          <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <Text > Tap on</Text>
            <TouchableOpacity onPress={() => navigation.navigate('CurrentSession')}>
              <Text style={styles.navigationText}>Current Session  </Text>
            </TouchableOpacity>
            <Text>to continue.</Text>
          </View>
        </View>)
      }

      {openCamera ? <GuestQR navigation={navigation}/> :
        <View>
          {accountType === '' && <View style={styles.joinContainer}>
            <TouchableOpacity onPress={() => dispatch({ type: 'SET_OPEN_CAMERA', openCamera: true })}>
              <Image
                source={require(scanQrCodeImage)}
              />
            </TouchableOpacity>
            <Text>Scan QR code to join</Text>
          </View>}
        </View>}

    </SafeArea>
  );
};

export default JoinScreen;