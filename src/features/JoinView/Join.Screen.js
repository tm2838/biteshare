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
  sessionContainer: {

    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 200,
    textAlign: 'center',
    fontFamily: fonts.heading,
    fontSize: 20,

  }
});

const JoinScreen = ({ route, navigation }) => {
  console.log('----Join Screen-----> route', route, 'navigation-->', navigation );

  const scanQrCodeImage = '../../../assets/qr-code-image.png';
  const { state: { accountType }, dispatch } = useContext(BiteShareContext);
  const [openCamera, setOpenCamera] = useState(false);

  //QR code will only shown if you are a GUEST
  return (
    <SafeArea>
      {accountType === 'GUEST' ?
        (openCamera ? <GuestQR navigation={navigation}/> :
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
        :
        <View>
          <Text style={styles.sessionContainer}> You are currently a HOST.</Text>
        </View>
      }

    </SafeArea>
  );
};

export default JoinScreen;