import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../infrastructure/colors.js';
import { fonts } from '../../../infrastructure/fonts.js';
import BiteshareButton from '../../../components/BiteshareButton.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brand.body,
    marginTop: 200,
  },
  baseText: {
    marginTop: 50,
    fontSize: 25,
    textAlign: 'center',
    height: 50,
    fontFamily: fonts.body,
    color: colors.brand.darkBlue
  }
});


const CurrentSessionMenu = ({ changeTab }) => {
  return (
    <View style = {styles.menuContainer}>
      <Text>This is Menu Screen.</Text>
    </View>
  );
};

export default CurrentSessionMenu;