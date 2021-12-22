import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { colors } from '../../infrastructure/colors.js';
import BiteshareButton from '../BiteshareButton.js';
import { BiteShareContext } from '../../BiteShareContext.js';

const styles = StyleSheet.create({
  container: {
    height: 50,
    margin: 5,
    padding: 10,
    backgroundColor: colors.brand.ebisuLight,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profileContainer: {
    width: '20%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 80
  },
  profile: {
    borderRadius: 10,
    backgroundColor: '#000',
    width: 20,
    height: 20,
    marginRight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});

const Guest = ({ guest }) => {
  const { state: { guests }, dispatch } = useContext(BiteShareContext);
  const [status, setStatus] = useState('access'); // access: allow/deny guest; status: ready/not ready;
  // not ready -> ready should be triggered by clicking on 'I'm ready' in menu's tab, DB should be updated
  // on click, and this summary page should pull from DB periodically to see whether that status has changed?
  const allowButtonStyle = { margin: 0, marginRight: 10, backgroundColor: colors.brand.beachLight };
  const denyButtonStyle = { margin: 0, backgroundColor: colors.brand.kazanLight };

  const handleAllowGuest = () => {
    setStatus('not ready');
  };

  const handleDenyGuest = () => {
    const updatedGuests = guests.filter((g) => g.name !== guest.item.name);
    dispatch({ type: 'SET_GUESTS', guests: updatedGuests });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profile}></View>
        <Text>{guest.item.name}</Text>
      </View>
      {status === 'access'
        ?
        <View style={styles.buttonContainer}>
          <BiteshareButton size={70} title='Allow' buttonStyle={allowButtonStyle} onPress={handleAllowGuest} />
          <BiteshareButton size={70} title='Deny' buttonStyle={denyButtonStyle} onPress={handleDenyGuest} />
        </View>
        :
        <View style={styles.buttonContainer}>
          <BiteshareButton size={70} title='Not Ready' />
        </View>
      }
    </View>
  );
};

export default Guest;