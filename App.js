/* eslint-disable camelcase */
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();
import { StatusBar } from 'expo-status-bar';
import React, { useReducer } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/infrastructure/index.js';
import DummyComponent from './src/features/Dummy.js';
import { BiteShareContext, biteShareReducer, biteShareState } from './src/BiteShareContext';
// import { addANewAnonymousDocument, getAllDocuments, readDocSnapshotListener, readQuerySnapshotListener, updateADocument } from './firebase/helpers/database.firebase.js';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/features/HomeView/Home.Screen.js';
import AppLoading from 'expo-app-loading';
import LoginScreen from './src/features/LoginView/Login.Screen';
import SignupScreen from './src/features/SignupView/Signup.Screen';


import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

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

export default function App() {
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
    <BiteShareContext.Provider value={{ state, dispatch }}>
      {!fontsLoaded
        ? <AppLoading />
        : (<ThemeProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name='Login'
                component={LoginScreen}
              />
              <Stack.Screen
                name='Home'
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='Signup'
                component={SignupScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>)
      }
    </BiteShareContext.Provider>
  );
}
