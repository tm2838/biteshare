import React, { useEffect, useContext } from 'react';
import { SafeAreaView, StyleSheet, FlatList } from 'react-native';
import Guest from './Guest.js';
import { BiteShareContext } from '../../../BiteShareContext.js';
import { readCollectionSnapshotListener } from '../../../../firebase/helpers/database.firebase.js';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '42%',
  },
});

const GuestList = () => {
  const { state: { guests, accountHolderName, sessionId, nickname }, dispatch } = useContext(BiteShareContext);

  useEffect(() => {
    if (guests.length && guests.filter((guest) => guest.joinRequest === 'allowed').every((guest) => guest.orderStatus === 'ready')) {
      console.log('hey there');
      dispatch({ type: 'SET_ORDER_STATUS', isEveryoneReady: true });
    }
  }, [guests]);

  useEffect(() => {
    if (sessionId) {
      readCollectionSnapshotListener(`transactions/${sessionId}/attendees`, (result) => {
        const guests = [];
        result.forEach((doc) => {
          guests.push(doc.data());
        });
        const currentAccount = guests.filter((guest) => guest.name === accountHolderName || guest.name === nickname); // Might Need to change here
        const otherAccounts = guests.filter((guest) => guest.name !== accountHolderName && guest.name !== nickname); // Same here as well
        dispatch({ type: 'SET_GUESTS', guests: [...currentAccount, ...otherAccounts] });
      });
    }
  }, [sessionId]);


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