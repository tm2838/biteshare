import { auth } from '../firebase.config.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

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

export { signUpNewUser, loginUser };
