import { auth } from '../firebase.config.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  getAuth,
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
  const auth = getAuth();

  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log('Token----------> ', token);
      console.log('User ----->', user);

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
  // return signInWithRedirect(auth, provider);
};

// const authorized = () => {
//   return auth.onAuthStateChanged;
// };
const authorized = auth.onAuthStateChanged;

const signOutUser = () => {
  return signOut(auth);
};

export { signUpNewUser, loginUser, googleLogin, authorized, signOutUser };
