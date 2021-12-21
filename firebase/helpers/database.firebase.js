import { db } from '../firebase.config.js';
import { collection, addDoc, getDocs } from 'firebase/firestore';
/**
  Use this file to create helper functions for firestore database
 An example is provided here for creating a new collection
 References: https://firebase.google.com/docs/reference/js/firestore_.md?authuser=3#@firebase/firestore
            https://firebase.google.com/docs/firestore/quickstart?authuser=3

 */

const addNewDocument = (collectionName, data) => {
  return addDoc(collection(db, collectionName), data);
};

const getAllDocuments = (collectionName) => {
  return getDocs(collection(db, collectionName));
};

export { addNewDocument, getAllDocuments };
