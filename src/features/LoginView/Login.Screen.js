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
    marginTop: 70
  },
  loginEntries: {
    flex: 2.5,
    margin: 20,
    alignItems: 'center',
  },
  signUp: {
    margin: 0,
    padding: 0,
    // flex: 0.1,
    // textAlign: 'center',
    fontFamily: theme.fonts.heading,
    textDecorationLine: 'underline'
  }
});

const LoginScreen = () => {
  //useEffect => onAuthStateChanged
  const navigation = useNavigation();
  const { state: { authenticated }, dispatch } = useContext(BiteShareContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    //isloading?
    loginUser(email, password)
      .then(userCredentials => {
        // console.log('user is:', userCredentials.user.email);
        dispatch({ type: 'SET_AUTH', authenticated: true });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <SafeArea>
      <View style={styles.loginContainer}>
        <Text style={styles.biteshareTitle}>BITESHARE</Text>
        <KeyboardAvoidingView
          style={styles.loginEntries}>
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
};

export default LoginScreen;