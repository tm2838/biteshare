import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SafeArea from '../../components/SafeArea';
import { theme } from '../../infrastructure/index';
import { BiteShareContext } from '../../BiteShareContext';
import * as Google from 'expo-google-app-auth';


const styles = StyleSheet.create({
  googleContainer: {
    flex: 1,
    backgroundColor: theme.colors.brand.login,
  },

  googleButton: {
    marginTop: 50,
  },

});

const GoogleLogin = () => {
  const navigation = useNavigation();
  const { state: { authenticated }, dispatch } = useContext(BiteShareContext);


  const signInAsync = async () => {
    console.log('GoogleLogin.js 6 | loggin in');
    try {
      const { type, user } = await Google.logInAsync({
        iosClientId: '90738707092-9ik3l59ad22hfghgrms9ti5cgn2da675.apps.googleusercontent.com',
        // androidClientId: '<YOUR_ANDROID_CLIENT_ID>',
      });
      console.log('user', user);

      if (type === 'success') {
        // Then you can use the Google REST API
        console.log('GoogleLogin.js 17 | success, navigating to profile');
        navigation.navigate('Home');
        // navigation.navigate('Profile', { user });
      }
    } catch (error) {
      console.log('GoogleLogin.js 19 | error with login', error);
    }
  };



  return (
    <SafeArea>

      <View>
        <Button title="Login with Google" onPress={signInAsync} />


      </View>
    </SafeArea >
  );
};

export default GoogleLogin;