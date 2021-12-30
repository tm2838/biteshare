import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const styles = StyleSheet.create({
  billsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const CurrentSessionBills = ({ changeTab }) => {
  return (
    <View style = {styles.billsContainer}>
      <Text>This is Bills Screen.</Text>
    </View>
  );
};

export default CurrentSessionBills;