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
import { getADocReferenceFromCollection } from '../../../firebase/helpers/database.firebase';
import GoogleLogin from './GoogleLogin';

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
  authProvider: {
    width: 130,
    marginTop: 10,
    flexDirection: 'row',
  }
});

const LoginScreen = () => {
  const navigation = useNavigation();
  const { state: { accountType, accountHolderName, nickname }, dispatch } = useContext(BiteShareContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        if (user.providerData[0].displayName) {
          let accountHolderName = user.providerData[0].displayName;
          let nickname = accountHolderName.split(' ')[0];
          dispatch({ type: 'SET_ACCOUNT_HOLDER_NAME', accountHolderName });
          dispatch({ type: 'SET_NICKNAME', nickname });
          dispatch({ type: 'SET_ACCOUNT_TYPE', accountType: '' }); //reset the accountType to null
        }
        navigation.navigate('Home');
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = () => {
    //isloading?
    loginUser(email, password)
      .then(userCredentials => {
        console.log('userCredentials in LOGIN:', userCredentials.user.providerData[0].displayName);
        dispatch({ type: 'SET_EMAIL', email });
        getADocReferenceFromCollection('users', 'email', '==', email)
          .then((qResult) => {
            qResult.forEach((doc) => {
              dispatch({ type: 'SET_USER_ID', userId: doc.id });
            });
          })
          .catch((error) => {
            console.log('fail to set user id');
          });
      })
      .catch(err => {
        console.log(err);
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
              <Text style={styles.signUp}> Sign Up</Text>
            </Text>
          </Pressable>
          <View style={styles.authProvider}>
            <GoogleLogin />
            <FacebookLogin />
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeArea >
  );
};

export default LoginScreen;