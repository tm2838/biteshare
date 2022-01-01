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

export { signUpNewUser, loginUser, googleLogin, authorized, signOutUser };
