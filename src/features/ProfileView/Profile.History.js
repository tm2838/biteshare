import React, { useContext, useState, useEffect } from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { colors } from '../../infrastructure/colors';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import { BiteShareContext } from '../../BiteShareContext';
import { getADocReferenceFromCollection } from '../../../firebase/helpers/database.firebase.js';

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
  const [biteHistory, setBiteHistory] = useState([]);
  const { state: { userId, email }, dispatch } = useContext(BiteShareContext);

  const mockBites = [
    {restauraunt: 'Grey Ghost', hostStatus: 'Host', bill: 32.42},
    {restauraunt: 'Barda', hostStatus: 'Guest', bill: 22.42},
    {restauraunt: 'Ima', hostStatus: 'Guest', bill: 12.43},
    {restauraunt: 'Lenny\'s', hostStatus: 'Host', bill: 9.44},
    {restauraunt: 'Supinos', hostStatus: 'Guest', bill: 25.45},
    {restauraunt: 'Flowers of Vietnam', hostStatus: 'Host', bill: 42.45},
    {restauraunt: 'Taqueria El Rey', hostStatus: 'Host', bill: 8.49}
  ];

  const renderBite = ({item, index}) => (<PreviousBite meal={item} index={index}/>);

  useEffect(() => {
    console.log('UserID in profile history state: ', userId, email);

    getADocReferenceFromCollection(`users`, 'userId', '==', userId)
      .then((qResult) => {
        //Collection array for transactions

        qResult.forEach((doc) => {
          //Create a "bite" object for each entry {restauraunt: 'Grey Ghost', hostStatus: 'Host', bill: 32.42}
          //push to collection array
          console.log(doc)
        });
      })
      .then((bites) => {
        setBiteHistory(bites)
      })
      .catch((error) => {
        console.log('fail to set user id');
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bites Shared </Text>
      <FlatList
        style={styles.list}
        data={ mockBites }
        renderItem={renderBite}
        // keyExtractor={mockBites.index}
        keyExtractor={(mockBites, index) => index.toString()}
      />
    </View>

  );
};

export default ProfileHistory;