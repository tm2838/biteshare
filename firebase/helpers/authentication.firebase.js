import { auth } from '../firebase.config.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import * as Facebook from 'expo-facebook';
/**
  Use this file to create helper functions for firebase authentication
 An example is provided here for creating new User using email & password
 References: https://firebase.google.com/docs/reference/js/auth?authuser=3
            https://firebase.google.com/docs/auth/web/start?authuser=3

 */

// Method for creating/Sign Up a new user
const signUpNewUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const googleLogin = () => {
  const provider = new GoogleAuthProvider();
  return signInWithRedirect(auth, provider);
};

// const authorized = () => {
//   return auth.onAuthStateChanged;
// };
const authorized = auth.onAuthStateChanged;

const signOutUser = () => {
  return signOut(auth);
};

const fbLogin = async () => {
  try {
    await Facebook.initializeAsync({ appId: '243179384596845', appName: 'BiteShare' }); // appId from facebook developer account
    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      // Get the user's info using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      const jsonResponse = await response.json();
      return Promise.resolve(jsonResponse);
    } else {
      alert('You cancelled login with facebook');
      return Promise.resolve('cancelled');
    }
  } catch (error) {
    return Promise.reject(new Error('Facebook Login failed'));
  }
};

export { signUpNewUser, loginUser, googleLogin, authorized, signOutUser, fbLogin };
