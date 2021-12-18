import { StatusBar } from 'expo-status-bar';
import React, { useReducer } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/infrastructure/index.js';
import DummyComponent from './src/features/Dummy.js';
import { BiteShareContext, biteShareReducer, biteShareState } from './src/BiteShareContext';

export default function App() {
  const [state, dispatch] = useReducer(biteShareReducer, biteShareState);
  return (
    <BiteShareContext.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={theme}>
        <DummyComponent />
      </ThemeProvider>

    </BiteShareContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
