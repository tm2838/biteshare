import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import GuestList from './GuestList.js';
import SplitBillOptions from './SplitBillOptions.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const CurrentSessionSummary = () => {
  return (
    <View style={styles.container}>
      <GuestList />
      <SplitBillOptions />
    </View>
  );
};

export default CurrentSessionSummary;