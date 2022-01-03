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
    justifyContent: 'space-around',

    width: '90%',

  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    padding: 10
  },
  button: {
    // backgroundColor: colors.brand.ebisuLight2,
    borderRadius: 15,
    height: 40,
    // marginRight: 20,
    // marginTop: 10,
    // justifyContent: 'space-around',


    borderColor: 'black',
    borderWidth: 1,


    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brand.ebisuLight2,
    margin: 5,
    justifyContent: 'space-around',
  }
});

const SettingButton = () => {

  return (
    <View style={styles.container}>

      {/* Scrollable list of previous bites */}
      <Text style={styles.title}>Account Settings</Text>

      <Text style={styles.button}>Personal Information</Text>


    </View>
  );
};

export default SettingButton;