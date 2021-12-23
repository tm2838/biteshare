import React, { useEffect, useContext } from 'react';
import { SafeAreaView, StyleSheet, FlatList } from 'react-native';
import Guest from './Guest.js';
import mockGuests from '../../../../fixtures/mockGuests.json';
import { BiteShareContext } from '../../../BiteShareContext.js';

const styles = StyleSheet.create({
  container: {
    width: 400,
    height: 300,
  },
});

const GuestList = () => {
  const { state: { guests, accountHolderName }, dispatch } = useContext(BiteShareContext);

  useEffect(() => {
    // @TODO:
    // replace mockGuests with real guests
    // pull from DB periodically - potentially with 'meal session id === current meal session id' and 'request pending === true'?
    const currentAccount = mockGuests.filter((guest) => guest.name === accountHolderName);
    const otherAccounts = mockGuests.filter((guest) => guest.name !== accountHolderName);
    dispatch({ type: 'SET_GUESTS', guests: [...currentAccount, ...otherAccounts] }); // make sure accountHolder always shows up on top
  }, [mockGuests]);

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