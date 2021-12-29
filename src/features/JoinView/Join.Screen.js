import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import SafeArea from '../../components/SafeArea';
import GuestQR from './GuestQR.js';
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
  const [openCamera, setOpenCamera] = useState(false);
  useEffect(()=>{
    console.log('route--*****************JOIN SESSION*******************>', route);
    // ************  Crystal's notes: The following code allows the navigation from 'create a session' to 'QR code'***
    //**** will revisit again after the explore page is implemented ****
    // if (route.params?.previous === 'create a session') {
    //   console.log('TEST----------------------');
    //   setCurrentTab('QR Code');
    // }
    if (route.params?.previous === 'coming from back button') {
      console.log('TEST-------JOIN ---BACK------------');
      navigation.navigate('Profile');
    }
  }, []);
  return (
    <SafeArea>
      {openCamera ? <GuestQR/> :
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
        </View>}
    </SafeArea>
  );
};

export default JoinScreen;