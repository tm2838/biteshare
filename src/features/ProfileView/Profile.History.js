import React, { useContext } from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { colors } from '../../infrastructure/colors';
import { StyleSheet, Text, View, FlatList} from 'react-native';
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

  },
  title: {
    flex: .1,
    fontSize: 25,
    fontWeight: 'bold',
  },
  list: {
    flex: 1
  }
});



const ProfileHistory = () => {


  const mockBites = [
    {restauraunt: 'Grey Ghost', hostStatus: 'Host', bill: 32.40},
    {restauraunt: 'Barda', hostStatus: 'Guest', bill: 22.40},
    {restauraunt: 'Ima', hostStatus: 'Guest', bill: 12.40},
    {restauraunt: 'Lenny\'s', hostStatus: 'Host', bill: 9.40},
    {restauraunt: 'Supinos', hostStatus: 'Guest', bill: 25.40},
    {restauraunt: 'Flowers of Vietnam', hostStatus: 'Host', bill: 42.40},
    {restauraunt: 'Taqueria El Rey', hostStatus: 'Host', bill: 8.40}
  ];


  const renderBite = ({item, index}) => (<PreviousBite meal={item} index={index}/>);

  //Query previous bites from db
  //Restauraunt Name - Guest / Host Status - Price



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bites Shared </Text>

      <FlatList
        style={styles.list}
        data={ mockBites }
        renderItem={renderBite}
      />





    </View>

  );
};

export default ProfileHistory;