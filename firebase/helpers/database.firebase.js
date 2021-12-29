import { db } from '../firebase.config.js';
import { collection, addDoc, getDocs, doc, setDoc, updateDoc, deleteDoc, deleteField, onSnapshot, query, where } from 'firebase/firestore';
/**
  Use this file to create helper functions for firestore database
 An example is provided here for creating a new collection
 References: https://firebase.google.com/docs/reference/js/firestore_.md?authuser=3#@firebase/firestore
            https://firebase.google.com/docs/firestore/quickstart?authuser=3

 */


const addANewNamedDocument = (collectionName, documentName, data) => {
  return setDoc(doc(db, collectionName, documentName), data);
};

const addANewAnonymousDocument = (collectionName, data) => {
  return addDoc(collection(db, collectionName), data);
};

const getAllDocuments = (collectionName) => {
  return getDocs(collection(db, collectionName));
};

const updateADocument = (collectionName, documentName, updatedData) => {
  const docRef = doc(db, collectionName, documentName);
  return updateDoc(docRef, updatedData);
};

const deleteADocument = (collectionName, documentName) => {
  return deleteDoc(doc(db, collectionName, documentName));
};

const deleteASpecificFieldInADocument = (collectionName, documentName, fieldName) => {
  const docRef = doc(db, collectionName, documentName);
  return updateDoc(docRef, {
    [fieldName]: deleteField()
  });
};

/*********************************** Sanpshot listeners *******************************************/
const readDocSnapshotListener = (collectionName, documentName, callback) => {
  const docRef = doc(db, collectionName, documentName);
  return onSnapshot(docRef, (doc) => {
    callback(doc);
  });
};

const readQuerySnapshotListener = (collectionName, fieldName, comparisonOperator, value, callback) => {
  const q = query(collection(db, collectionName), where(fieldName, comparisonOperator, value));
  return onSnapshot(q, (querySnapshot) => {
    callback(querySnapshot);
  });
};


export {
  addANewAnonymousDocument,
  getAllDocuments,
  addANewNamedDocument,
  updateADocument,
  deleteADocument,
  deleteASpecificFieldInADocument,
  readDocSnapshotListener,
  readQuerySnapshotListener,
};
