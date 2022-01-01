import React, { useEffect, useContext } from 'react';
import { SafeAreaView, StyleSheet, FlatList } from 'react-native';
import Guest from './Guest.js';
import mockGuests from '../../../../fixtures/mockGuests.json';
import { BiteShareContext } from '../../../BiteShareContext.js';
import { readDocSnapshotListener, readCollectionSnapshotListener } from '../../../../firebase/helpers/database.firebase.js';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '42%',
  },
});

const GuestList = () => {
  const { state: { guests, accountHolderName, sessionId }, dispatch } = useContext(BiteShareContext);

  useEffect(() => {
    if (guests.length && guests.every((guest) => guest.orderStatus === 'ready')) {
      dispatch({ type: 'SET_ORDER_STATUS', isEveryoneReady: true });
    }
  }, [guests]);

  useEffect(() => {
    readCollectionSnapshotListener(`transactions/${sessionId}/attendees`, (result) => {
      const guests = [];
      result.forEach((doc) => {
        guests.push(doc.data());
      });
      const currentAccount = guests.filter((guest) => guest.name === accountHolderName); // Might Need to change here
      const otherAccounts = guests.filter((guest) => guest.name !== accountHolderName); // Same here as well
      dispatch({ type: 'SET_GUESTS', guests: [...currentAccount, ...otherAccounts] });
    });
  }, []);


  const renderGuest = (guest) => (<Guest guest={guest.item} />);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={guests}
        renderItem={renderGuest}
        keyExtractor={guest => guest.name}
      />
    </SafeAreaView>
  );
};

export default GuestList;