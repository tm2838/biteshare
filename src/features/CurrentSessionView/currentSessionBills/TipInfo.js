import React, { useState } from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '../../../infrastructure/colors.js';


const styles = StyleSheet.create({
  tip: {
    textAlign: 'center',
    width: 300,
    padding: 7,
    backgroundColor: colors.brand.ebisu,
    color: colors.brand.darkBlue
  },

  tipSelected: {
    textAlign: 'center',
    width: 300,
    padding: 7,
    backgroundColor: colors.brand.rausch,
    color: colors.brand.darkBlue
  }
});

const TipInfo = ({ individualBill, tipPercentage, index, selected, setSelected }) => {
  const addTip = (bill, percent) => bill * percent;

  return (
    <Pressable onPress={() => {
      if (index === selected) {
        setSelected(null);
      } else {
        setSelected(index);
      }
    }}>
      {index === selected ?
        <Text style={styles.tipSelected}>{`Add ${tipPercentage * 100}% tip: $${addTip(individualBill, tipPercentage).toFixed(2)}`}</Text> :
        <Text style={styles.tip}>{`Add ${tipPercentage * 100}% tip: $${addTip(individualBill, tipPercentage).toFixed(2)}`}</Text>
      }
    </Pressable>
  );
};

export default TipInfo;
