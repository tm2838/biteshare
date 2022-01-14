import React, { useContext, useState, useEffect } from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { colors } from '../../infrastructure/colors';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import { BiteShareContext } from '../../BiteShareContext';
import { readCollectionSnapshotListener } from '../../../firebase/helpers/database.firebase.js';

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
    padding: 15
  },
  list: {
    flex: 1
  }
});

const ProfileHistory = () => {
  const mockBites = [
    {restaurant: 'Grey Ghost', hostStatus: 'Host', bill: 32.42, date: new Date('1995-10-21')},
    {restaurant: 'Barda', hostStatus: 'Guest', bill: 22.42, date: new Date('1995-10-21')},
    {restaurant: 'Ima', hostStatus: 'Guest', bill: 12.43, date: new Date('1995-10-21')},
    {restaurant: 'Lenny\'s', hostStatus: 'Host', bill: 9.44, date: new Date('1995-10-21')},
    {restaurant: 'Supinos', hostStatus: 'Guest', bill: 25.45, date: new Date('1995-10-21')},
    {restaurant: 'Flowers of Vietnam', hostStatus: 'Host', bill: 42.45, date: new Date('1995-10-21')},
    {restaurant: 'Taqueria El Rey', hostStatus: 'Host', bill: 8.49, date: new Date('1995-10-21')}
  ];

  const [biteHistory, setBiteHistory] = useState(mockBites);
  const { state: { userId }, dispatch } = useContext(BiteShareContext);

  const renderBite = ({item, index}) => (<PreviousBite meal={item} index={index}/>);

  useEffect(() => {
    if (userId) {
      readCollectionSnapshotListener(`users/${userId}/transactions`, (transactions) => {
        let cleanedTransactions = [...biteHistory];
        transactions.forEach((session) => {
          const { restaurantName, individualBills, role, date, isCurrent } = session.data();
          if (!isCurrent) {
            const bite = {
              restaurant: restaurantName,
              bill: individualBills,
              hostStatus: role || 'Guest',
              date: date.toDate()
            };
            cleanedTransactions.unshift(bite);
          }
        });
        cleanedTransactions = cleanedTransactions.sort((a, b) => a.date > b.date ? -1 : a.date < b.date ? 1 : 0);
        setBiteHistory(cleanedTransactions);
      })
    }
  }, [userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bites Shared </Text>
      <FlatList
        style={styles.list}
        data={ biteHistory }
        renderItem={renderBite}
        keyExtractor={(mockBites, index) => index.toString()}
      />
    </View>

  );
};

export default ProfileHistory;

//Q's

//