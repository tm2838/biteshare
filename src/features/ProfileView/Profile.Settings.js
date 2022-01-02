import React, { useContext } from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { colors } from '../../infrastructure/colors';
import { StyleSheet, Text, View, Image } from 'react-native';
import { BiteShareContext } from '../../BiteShareContext';

const styles = StyleSheet.create({
  container: {
    flex: .25,
    flexDirection: 'column',
    padding: 5,
    margin: 5,
    justifyContent: 'flex-start',
    width: '90%',

    borderColor: 'black',
    borderWidth: 1
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25
  },
  button: {
    backgroundColor: colors.brand.ebisuLight2,
    borderRadius: 15,
    height: 20,
    marginRight: 20,
    borderColor: 'black',
    borderWidth: 1
  }
});

const SettingButton = () => {

  return (
    <View style={styles.container}>

      {/* Scrollable list of previous bites */}
      <Text style={styles.title}>Account Settings</Text>

      <Text style={styles.button}>Personal Informaton {'>'}</Text>


    </View>
  );
};

export default SettingButton;