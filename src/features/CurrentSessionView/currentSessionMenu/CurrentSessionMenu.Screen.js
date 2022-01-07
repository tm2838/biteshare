import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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

const CurrentSessionMenu = ({ changeTab }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Menu</Text>
    <SessionMenu />
    <ReadyButton changeTab={changeTab}/>
  </View>
);

export default CurrentSessionMenu;