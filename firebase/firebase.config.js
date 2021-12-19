import { getApps, getApp, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA7ipbUm427J2zXmr-hiKnI9ExfbI_QxgY',
  authDomain: 'blue-ocean-capstone.firebaseapp.com',
  projectId: 'blue-ocean-capstone',
  storageBucket: 'blue-ocean-capstone.appspot.com',
  messagingSenderId: '90738707092',
  appId: '1:90738707092:web:d3ad35f16f9b309d154281'
};

// Initialize Firebase
let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApp();
}

const auth = getAuth(firebaseApp); // initialize authentication service
const db = getFirestore(firebaseApp); // initialize firestore service

export { auth, db };
