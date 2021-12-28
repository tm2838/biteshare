import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import SafeArea from '../../components/SafeArea';
// import GuestQR from '../GuestQR.js';
import JoinScreenHeader from './JoinScreenHeader';
import { colors } from '../../infrastructure/colors';


const styles = StyleSheet.create({
  joinContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 200
  }
});

const JoinScreen = ({ route, navigation }) => {
  const scanQrCodeImage = '../../../assets/qr-code-image.png';
  //inserting <GuestQR/> does not open the QR reader on my phone
  return (
    <SafeArea>
      <View>
        <JoinScreenHeader />
        <View style={styles.joinContainer}>
          <TouchableOpacity onPress={() => alert('image clicked!')}>
            <Image
              source={require(scanQrCodeImage)}
            />
          </TouchableOpacity>
          <Text>Scan QR code to join</Text>
        </View>
      </View>
    </SafeArea>
  );
};

export default JoinScreen;