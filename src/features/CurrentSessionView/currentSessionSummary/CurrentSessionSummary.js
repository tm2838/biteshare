import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import GuestList from './GuestList.js';
import SplitBillOptions from './SplitBillOptions.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 200,
    height: 500
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