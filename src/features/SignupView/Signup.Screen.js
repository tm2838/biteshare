import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import SafeArea from '../../components/SafeArea';
import InputField from '../../components/InputField';
import { theme } from '../../infrastructure/index';
import BigButton from '../../components/BigButton';
import { BiteShareContext } from '../../BiteShareContext';

import { auth } from '../../../firebase/firebase.config';
import { signUpNewUser, googleLogin } from '../../../firebase/helpers/authentication.firebase';

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
    flex: 4.5,
    margin: 20,
    alignItems: 'center',
  },
  signUp: {
    margin: 0,
    padding: 0,
    fontFamily: theme.fonts.heading,
    textDecorationLine: 'underline'
  },
  googleButton: {
    marginTop: 50,
  },
  error: {
    color: 'red'
  }
});

const SignupScreen = () => {
  const navigation = useNavigation();
  const { state: { authenticated }, dispatch } = useContext(BiteShareContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [signupError, setSignupError] = useState(null);
  const [accountHolderName, setAccountHolderName] = useState(null);

  const handleCreateNewUser = () => {
    if (password !== confirmPassword) {
      return setSignupError('Passwords do not match');
    }
    signUpNewUser(email, password)
      .then(userCredentials => {
        dispatch({ type: 'SET_AUTH', authenticated: true });
        dispatch({ type: 'SET_EMAIL', email });
        dispatch({ type: 'SET_ACCOUNT_HOLDER_NAME', accountHolderName });
      })
      .catch(err => {
        setSignupError(err.message.toString());
      });
  };

  const handleGoogleLogin = () => {
    console.log('user is:');
    googleLogin()
      .then((result) => {
        const user = result.user;
      }).catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const goToLoginPage = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeArea>
      <View style={styles.loginContainer}>
        <Text style={styles.biteshareTitle}>BITESHARE</Text>
        <KeyboardAvoidingView
          style={styles.loginEntries}>
          <InputField
            placeholder={'Name'}
            secureText={false}
            inputValue={accountHolderName}
            setInputValue={setAccountHolderName} />
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
          <InputField
            placeholder={'Confirm Password'}
            secureText={true}
            inputValue={confirmPassword}
            setInputValue={setconfirmPassword} />
          {signupError &&
            <Text style={styles.error} variant={'error'}>{signupError}</Text>}
          <BigButton title={'Sign up'} handleLogin={handleCreateNewUser} />
          <Pressable onPress={goToLoginPage}>
            <Text>Have an account?
              <Text style={styles.signUp}> Log in</Text>
            </Text>
          </Pressable>
          <Pressable style={styles.googleButton} onPress={handleGoogleLogin}>
            <Text>Google</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </View>
    </SafeArea >
  );
};

export default SignupScreen;