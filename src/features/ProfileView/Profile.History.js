import React, { useContext } from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { colors } from '../../infrastructure/colors';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { BiteShareContext } from '../../BiteShareContext';
import SafeArea from '../../components/SafeArea';

import PreviousBite from './ProfileBites';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: 400,
    height: '45%',

    margin: 10,
    padding: 10,
    justifyContent: 'flex-start',

    borderColor: 'black',
    borderWidth: 1
  },
  title: {
    flex: .5,
    fontSize: 25,
    fontWeight: 'bold',

    borderColor: 'black',
    borderWidth: 1

  },
  bite: {
    flex: 1,
    justifyContent: 'space-between',
  }
});

const ProfileHistory = () => {


  const bites = [
    {restauraunt: 'Grey Ghost', hostStatus: 'Host', bill: 32.40},
    {restauraunt: 'Barda', hostStatus: 'Guest', bill: 22.40},
    {restauraunt: 'Ima', hostStatus: 'Guest', bill: 12.40},
    {restauraunt: 'Lenny\'s', hostStatus: 'Host', bill: 9.40},
    {restauraunt: 'Supinos', hostStatus: 'Guest', bill: 25.40},
    {restauraunt: 'Flowers of Vietnam', hostStatus: 'Host', bill: 42.40},
    {restauraunt: 'Taqueria El Rey', hostStatus: 'Host', bill: 8.40}
  ];

  //Query previous bites from db
  //Restauraunt Name - Guest / Host Status - Price


  //Map to bite components
  //Render to DOM in scrollable list

  return (
    <View style={styles.container}>
      <ScrollView>

        <Text style={styles.title}>Bites Shared </Text>
        <PreviousBite style={styles.bite}/>
        <PreviousBite style={styles.bite}/>
        <PreviousBite style={styles.bite}/>
        <PreviousBite style={styles.bite}/>
        <PreviousBite style={styles.bite}/>

      </ScrollView>
    </View>

  );
};

export default ProfileHistory;