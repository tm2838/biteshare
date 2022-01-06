import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import SafeArea from '../../components/SafeArea';
import GuestQR from './GuestQR.js';
import JoinScreenHeader from './JoinScreenHeader';
import { colors } from '../../infrastructure/colors';
import { fonts } from '../../infrastructure/fonts';
import { BiteShareContext } from '../../BiteShareContext';

const styles = StyleSheet.create({
  joinContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 200
  },
  hostContainer: {

    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 350,

  },
  hostText: {
    textAlign: 'center',
    fontFamily: fonts.heading,
    height: 50,
    fontSize: 20,
    color: colors.brand.rausch
  }
});

const JoinScreen = ({ route, navigation }) => {
  // console.log('----Join Screen-----> route', route, 'navigation-->', navigation );

  const scanQrCodeImage = '../../../assets/qr-code-image.png';
  const { state: { accountType }, dispatch } = useContext(BiteShareContext);
  const [openCamera, setOpenCamera] = useState(false);

  //QR code will NOT show if you are a HOST
  return ( 
    <SafeArea>
      {accountType === 'HOST' ?

        (<View style={styles.hostContainer}>
          <Text style={styles.hostText}> You are currently a HOST.</Text>
          <Text > Tap on CurrentSession</Text>
        </View>)
        :

        (openCamera ? <GuestQR navigation={navigation} /> :
          <View>
            <JoinScreenHeader />
            <View style={styles.joinContainer}>
              <TouchableOpacity onPress={() => setOpenCamera(true)}>
                <Image
                  source={require(scanQrCodeImage)}
                />
              </TouchableOpacity>
              <Text>Scan QR code to join</Text>
            </View>
          </View>)
      }

    </SafeArea>
  );
};

export default JoinScreen;