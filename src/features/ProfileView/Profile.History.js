import React, { useContext } from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { colors } from '../../infrastructure/colors';
import { StyleSheet, Text, View, Image } from 'react-native';
import { BiteShareContext } from '../../BiteShareContext';
import SafeArea from '../../components/SafeArea';

import PreviousBite from './ProfileBites';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: 400,
    height: '45%',
    // backgroundColor: 'red',
    margin: 10,
    padding: 10,
    justifyContent: 'flex-start',

    borderColor: 'black',
    borderWidth: 1
  },
  title: {
    flex: 1,
    fontSize: 25,
    fontWeight: 'bold'
  },
  bite: {
    flex: 1
  }
});

const ProfileHistory = () => {

  //Query previous bites from db
  //Restauraunt Name - Guest / Host Status - Price


  //Map to bite components
  //Render to DOM in scrollable list

  return (
    <View style={styles.container}>

      {/* Scrollable list of previous bites */}
      <Text style={styles.title}>Bites Shared </Text>
      <PreviousBite style={styles.bite}/>
      <PreviousBite style={styles.bite}/>
      <PreviousBite style={styles.bite}/>
      <PreviousBite style={styles.bite}/>
    </View>

  );
};

export default ProfileHistory;