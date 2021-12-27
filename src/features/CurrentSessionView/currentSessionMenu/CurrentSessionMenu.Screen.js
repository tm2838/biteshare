import React, { useContext, useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { colors } from '../../../infrastructure/colors.js';
import { fonts } from '../../../infrastructure/fonts.js';
import BiteshareButton from '../../../components/BiteshareButton.js';
import { BiteShareContext } from '../../../BiteShareContext';

import SessionMenu from './SessionMenu';
import ReadyButton from './ReadyButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: '5%',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    height: '10%',
  }

});

const CurrentSessionMenu = ({ changeTab }) => {
  const {state: { restaurantName, restaurantId, restaurantMenus}, dispatch } = useContext(BiteShareContext);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <SessionMenu />
      <ReadyButton />
    </View>
  );
};

export default CurrentSessionMenu;