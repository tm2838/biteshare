import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Pressable, Image } from 'react-native';
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
    marginTop: 70,
    width: 285,
    height: 250
  },
  biteshareTitleContainer: {
    width: '100%',
    alignItems: 'center'
  },
  loginEntries: {
    margin: 20,
    marginTop: 10
  },
  InputFieldsContainer: {
    backgroundColor: 'rgb(247, 228, 213)',
    padding: 20,
    alignItems: 'center',
    borderRadius: 50
  },
  buttonsContainer: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center'
  },
  loginButton: {
    margin: 10,
    width: '80%',
    height: 40,
    borderRadius: 10,
    backgroundColor: theme.colors.brand.rausch,
    justifyContent: 'center'
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    letterSpacing: 1
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
  const [loginError, setLoginError] = useState('');

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
        // console.log('userCredentials in LOGIN:', userCredentials.user.providerData[0].displayName);
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
        setLoginError(err.message);
      });
  };

  const goToSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <SafeArea>
      <View style={styles.loginContainer}>
        <View style={styles.biteshareTitleContainer}>
          <Image source={require('../../../assets/loginlogo.png')} style={styles.biteshareTitle} />
        </View>
        <KeyboardAvoidingView
          style={styles.loginEntries}>
          <View style={styles.InputFieldsContainer}>
            <InputField
              placeholder={'Email'}
              secureText={false}
              inputValue={email}
              setInputValue={setEmail} />
            <InputField
              testID='passwordInput'
              placeholder={'Password'}
              secureText={true}
              inputValue={password}
              setInputValue={setPassword} />
            {loginError ? <Text testID='loginButton'>{loginError}</Text> : null}
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
            <Pressable onPress={goToSignup}>
              <Text>Don't have an account?
                <Text style={styles.signUp}> Sign Up</Text>
              </Text>
            </Pressable>
            <View style={styles.authProvider}>
              <GoogleLogin />
              <FacebookLogin />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeArea >
  );
};

export default LoginScreen;