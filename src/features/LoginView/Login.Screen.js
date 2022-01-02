import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import SafeArea from '../../components/SafeArea';
import InputField from '../../components/InputField';
import { theme } from '../../infrastructure/index';
import BigButton from '../../components/BigButton';
import { BiteShareContext } from '../../BiteShareContext';
import FacebookLogin from '../LoginView/FacebookLogin';
import { auth } from '../../../firebase/firebase.config';
import { signUpNewUser, loginUser, googleLogin, onAuthStateChanged } from '../../../firebase/helpers/authentication.firebase';

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
    fontFamily: theme.fonts.heading,
    textDecorationLine: 'underline'
  },
  googleButton: {
    marginTop: 50,
  },
  authProvider: {
    flex: 1,
    flexDirection: 'row',
  }
});

const LoginScreen = () => {
  //useEffect => onAuthStateChanged
  const navigation = useNavigation();
  const { state: { authenticated }, dispatch } = useContext(BiteShareContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('Home');
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = () => {
    //isloading?
    loginUser(email, password)
      .then(userCredentials => {
        dispatch({ type: 'SET_AUTH', authenticated: true });
        dispatch({ type: 'SET_EMAIL', email });
      })
      .catch(err => {
        console.log(err);
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

  const goToSignup = () => {
    navigation.navigate('Signup');
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
          <Pressable onPress={goToSignup}>
            <Text>Don't have an account?
              <Text style={styles.signUp}> Sign Up</Text> {/*this will need "onPress => go to Sign up page"}*/}
            </Text>
          </Pressable>
          <Pressable style={styles.googleButton} onPress={handleGoogleLogin}>
            <Text>Google</Text>
          </Pressable>
          <View style={styles.authProvider}>
            <FacebookLogin />
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeArea >
  );
};

export default LoginScreen;