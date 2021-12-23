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
  const { state: { guests }, dispatch } = useContext(BiteShareContext);

  useEffect(() => {
    // @TODO:
    // replace mockGuests with real guests
    // pull from DB periodically - potentially with 'meal session id === current meal session id' and 'request pending === true'?
    dispatch({ type: 'SET_GUESTS', guests: mockGuests });
  }, [mockGuests]);

  const renderGuest = (guest) => (<Guest guest={guest.item} />);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={guests}
        renderItem={renderGuest}
        keyExtractor={guest => guest.name}
        style={styles.container}
      />
    </SafeAreaView>
  );
};

export default GuestList;