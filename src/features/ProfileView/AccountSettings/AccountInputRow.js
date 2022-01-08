import React, { useContext } from 'react';
import { colors } from '../../../infrastructure/colors';
import { StyleSheet, Text, View, Image } from 'react-native';
import { BiteShareContext } from '../../../BiteShareContext';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brand.ebisuLight2,
    margin: 5,
    justifyContent: 'space-around',

    borderRadius: 15,
    height: 40,
    marginRight: 20,
    marginTop: 10,

    flex: 1
  },
  text: {
    flex: 1,
    fontSize: 15
  },
  heading: {

  },
  info: {

  },
  input: {

  }
});

const AccountInfo = ({ heading, info }) => {

  return (
    <View style={styles.container}>

      <Text style={styles.text}>{heading}</Text>
      <Text style={styles.text}>{info}</Text>

    </View>
  );
};

export default AccountInfo;