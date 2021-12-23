import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BiteShareContext } from '../../../BiteShareContext.js';

import GuestList from './GuestList.js';
import SplitBillOptions from './SplitBillOptions.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 200,
  },
  title: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    height: 50,
  }
});

const CurrentSessionSummary = () => {
  const { state: { accountType } } = useContext(BiteShareContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Summary</Text>
      <GuestList />
      {accountType === 'HOST' && <SplitBillOptions />}
    </View>
  );
};

export default CurrentSessionSummary;