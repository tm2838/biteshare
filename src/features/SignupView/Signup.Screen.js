import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { colors } from '../../infrastructure/colors';

import { auth } from '../../../firebase/firebase.config';
import { signUpNewUser, googleLogin, updateProfile } from '../../../firebase/helpers/authentication.firebase';

import SafeArea from '../../components/SafeArea';
import InputField from '../../components/InputField';
import { theme } from '../../infrastructure/index';
import BigButton from '../../components/BigButton';
import { BiteShareContext } from '../../BiteShareContext';
import GoogleLogin from '../LoginView/GoogleLogin';
import FacebookLogin from '../LoginView/FacebookLogin';
import { addANewAnonymousDocument } from '../../../firebase/helpers/database.firebase';

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: theme.colors.brand.login,
  },
  biteshareTitle: {
    marginTop: 70,
    width: 300,
    height: 100
  },
  biteshareTitleContainer: {
    width: '100%',
    alignItems: 'center'
  },
  loginEntries: {
    margin: 30,
    // alignItems: 'center',
    // flex: 4.5,
  },
  InputFieldsContainer: {
    backgroundColor: 'rgb(235, 220, 209)',
    padding: 20,
    alignItems: 'center',
    borderRadius: 50

  },
  buttonsContainer: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center'
  },
  createAccountButton: {
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
  error: {
    color: 'red',
    textAlign: 'center'
  },
  authProvider: {
    width: 130,
    marginTop: 10,
    flexDirection: 'row',
  }
});

const SignupScreen = () => {
  const navigation = useNavigation();
  const { state: { }, dispatch } = useContext(BiteShareContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [signupError, setSignupError] = useState(null);
  const [accountHolderName, setAccountHolderName] = useState('');

  const updateUserProfile = () => {
    updateProfile(auth.currentUser, {
      displayName: accountHolderName
    }).then(() => {
      // console.log('profile updatead');
    }).catch((error) => {
      console.log('error updating profile');
    });
  };

  const handleCreateNewUser = () => {
    if (password !== confirmPassword) {
      return setSignupError('Passwords do not match');
    }

    signUpNewUser(email, password)
      .then(async userCredentials => {
        const nickname = accountHolderName.split(' ')[0];
        // console.log('num one:', accountHolderName, nickname);
        dispatch({ type: 'SET_EMAIL', email });
        dispatch({ type: 'SET_ACCOUNT_HOLDER_NAME', accountHolderName });
        dispatch({ type: 'SET_NICKNAME', nickname });
        updateUserProfile();
        try {
          await addANewAnonymousDocument('users', {
            name: accountHolderName,
            email: email,
          })
          .then(() => {
            getADocReferenceFromCollection('users', 'email', '==', email)
            .then((qResult) => {
              qResult.forEach((doc) => {
                dispatch({ type: 'SET_USER_ID', userId: doc.id });
              });
            })
          })
        } catch (error) {
          console.log('Error creating new user in users collection when sign up for first time');
        }
      })
      .catch(err => {
        setSignupError(err.message.toString());
      });
  };

  const goToLoginPage = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeArea>
      <View style={styles.loginContainer}>
        <View style={styles.biteshareTitleContainer}>
          <Image source={require('../../../assets/signuplogo.png')} style={styles.biteshareTitle} />

        </View>
        <KeyboardAvoidingView
          style={styles.loginEntries}>
          <View style={styles.InputFieldsContainer}>
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
          </View>

          {signupError &&
            <Text style={styles.error} variant={'error'}>{signupError}</Text>}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.createAccountButton}
              onPress={handleCreateNewUser}>
              <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
            </TouchableOpacity>
            <Pressable onPress={goToLoginPage}>
              <Text>Have an account?
                <Text style={styles.signUp}> Log in</Text>
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

export default SignupScreen;