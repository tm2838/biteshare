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

const TipInfo = ({ individualBill, tipPercentage }) => {
  const [selected, setSelected] = useState(false);
  const toggle = () => setSelected(prevSelected => !prevSelected);

  const addTip = (bill, percent) => bill * percent;

  return (
    <Pressable onPress={toggle}>
      <Text style={selected ? styles.tipSelected : styles.tip}>{`Add ${tipPercentage * 100}% tip: $${addTip(individualBill, tipPercentage).toFixed(2)}`}</Text>
    </Pressable>
  );
};

export default TipInfo;
