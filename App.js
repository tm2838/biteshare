/* eslint-disable func-style */
/* eslint-disable camelcase */
import { StatusBar } from 'expo-status-bar';
import React, { useReducer, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/infrastructure/index.js';
import DummyComponent from './src/features/Dummy.js';
import { BiteShareContext, biteShareReducer, biteShareState } from './src/BiteShareContext';
import { signUpNewUser } from './firebase/helpers/authentication.firebase.js';
import { addNewDocument, getAllDocuments } from './firebase/helpers/database.firebase.js';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HostQR from './src/features/HostQR.js';
import AppLoading from 'expo-app-loading';

import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,

} from '@expo-google-fonts/open-sans';
import {

  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,

} from '@expo-google-fonts/montserrat';

const Stack = createStackNavigator();

function App() {
  const [state, dispatch] = useReducer(biteShareReducer, biteShareState);
  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HostQR} />
      <Stack.Screen name="Dummy" component={DummyComponent} />
    </Stack.Navigator>
  );
}
export default () => {




  // The following methods is a test/example code.
  // Please delete it when someone starts working on authentication

  /*
  signUpNewUser('jane.doe@gmail.com', 'test123')
    .then((userCredentails) => {
      console.log('User Credentials: ', userCredentails);
    })
    .catch((error) => {
      console.log('Error: ', error);
    });

  // addNewDocument('users', {
  //   firstName: 'Alan',
  //   middleName: 'Mathison',
  //   lastName: 'Turing',
  //   born: 1912,
  // })
  //   .then((docRef) => {
  //     console.log('Document written with ID: ', docRef.id);

  //     getAllDocuments('users')
  //       .then((querySnapshot) => {
  //         querySnapshot.forEach((doc) => {
  //           console.log(`${doc.id} => ${doc.data()}`);
  //         });
  //       })
  //       .catch((error) => {
  //         console.log('Error reading document');
  //       });
  //   })
  //   .catch((error) => {
  //     console.error('Error adding document: ', e);
  //   });

*/


  return (
    <BiteShareContext.Provider value={{ state, dispatch }}>
      { !fontsLoaded
        ? <AppLoading />
        : (<ThemeProvider theme={theme}>
          <App />

        </ThemeProvider>)
      }
    </BiteShareContext.Provider>
  );
};