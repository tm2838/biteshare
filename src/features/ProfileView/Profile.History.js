import React, { useContext, useState, useEffect } from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { colors } from '../../infrastructure/colors';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import { BiteShareContext } from '../../BiteShareContext';
import { getADocReferenceFromCollection, readASingleDocument, getAllDocuments } from '../../../firebase/helpers/database.firebase.js';

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
    paddingLeft:15,
  },
  list: {
    flex: 1,
    paddingLeft:15,
  }
});

const ProfileHistory = () => {
  const mockBites = [
    {restauraunt: 'Grey Ghost', hostStatus: 'Host', bill: 32.42},
    {restauraunt: 'Barda', hostStatus: 'Guest', bill: 22.42},
    {restauraunt: 'Ima', hostStatus: 'Guest', bill: 12.43},
    {restauraunt: 'Lenny\'s', hostStatus: 'Host', bill: 9.44},
    {restauraunt: 'Supinos', hostStatus: 'Guest', bill: 25.45},
    {restauraunt: 'Flowers of Vietnam', hostStatus: 'Host', bill: 42.45},
    {restauraunt: 'Taqueria El Rey', hostStatus: 'Host', bill: 8.49}
  ];

  const [biteHistory, setBiteHistory] = useState(mockBites);
  const { state: { userId }, dispatch } = useContext(BiteShareContext);


  const renderBite = ({item, index}) => (<PreviousBite meal={item} index={index}/>);

  useEffect(() => {
    readASingleDocument(`users`, userId )
      .then((user) => {
        let transactions = user.data().transactions;
        let cleanedTransactions = biteHistory;

        transactions.forEach((meal) => {
          let bite = {
            restauraunt: meal.restaurauntName,
            bill: meal.individualBill,
            hostStatus: meal.role
          };

          // console.log(bite);
          cleanedTransactions.push(bite);
        });

        setBiteHistory(cleanedTransactions)
      })
      .catch((err) => {
        console.log(`Error pulling transaction history for user: `, userId )
      })

  }, []);

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