import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import SafeArea from '../../components/SafeArea';
import InputField from '../../components/InputField';
import { theme } from '../../infrastructure/index';
import BigButton from '../../components/BigButton';
import { BiteShareContext } from '../../BiteShareContext';

import { auth } from '../../../firebase/firebase.config';
import { signUpNewUser, loginUser } from '../../../firebase/helpers/authentication.firebase';

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: theme.colors.brand.login,
  },
  biteshareTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: theme.fonts.heading,
    fontSize: 64,
    marginTop: 100
  },
  loginEntries: {
    flex: 2.5,
    padding: 20,
    alignItems: 'center',
  },
  signUp: {
    // flex: 0.1,
    // textAlign: 'center',
    fontFamily: theme.fonts.heading,
    textDecorationLine: 'underline'
  }
});

export default function LoginScreen() {
  //useEffect => onAuthStateChanged
  const navigation = useNavigation();
  const { state: { auth }, dispatch } = useContext(BiteShareContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useEffect(() => {
  //   const loginListener = () => {
  //     if (auth) {
  //       navigation.navigate('Home');
  //     }
  //   };
  //   return loginListener;
  // }, []);


  // const handleButtonPress = () => {
  //   dispatch({ type: 'SET_EMAIL', email });
  //   dispatch({ type: 'SET_ORDER_STATUS', password });
  // };
  const handleLogin = () => {
    //isloading?
    console.log('login press');
    loginUser(email, password)
      .then(userCredentials => {
        console.log('user is:', userCredentials.user.email);
        dispatch({ type: 'SET_AUTH', true });
        navigation.navigate('Home');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <SafeArea>
      <View style={styles.loginContainer}>
        <Text style={styles.biteshareTitle}>BITESHARE</Text>
        <KeyboardAvoidingView style={styles.loginEntries}>
          <InputField
            placeholder={'Email'}
            secureText={false}
            inputValue={email}
            setInputValue={setEmail} />
          <InputField
            placeholder={'Password'}
            secureText={true}
            inputValue={password}
            setInputValue={setPassword} />
          <BigButton title={'Login'} handleLogin={handleLogin} />
          <Text>Don't have an account?
            <Text style={styles.signUp}> Sign Up</Text> {/*this will need "onPress => go to Sign up page"}*/}
          </Text>
        </KeyboardAvoidingView>
      </View>
    </SafeArea >
  );
}
