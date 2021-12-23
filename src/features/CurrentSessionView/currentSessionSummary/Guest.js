import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { colors } from '../../../infrastructure/colors.js';
import BiteshareButton from '../../../components/BiteshareButton.js';
import { BiteShareContext } from '../../../BiteShareContext.js';

const styles = StyleSheet.create({
  container: {
    height: 50,
    margin: 5,
    padding: 10,
    backgroundColor: colors.brand.ebisuLight,
    flexDirection: 'row',
  },
  profileContainer: {
    width: 60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 80
  },
  profile: {
    borderRadius: 15,
    width: 30,
    height: 30,
    marginRight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});

const Guest = ({ guest }) => {
  const { state: { accountHolderName, guests }, dispatch } = useContext(BiteShareContext);
  const [status, setStatus] = useState('access'); // status: access/ready/not ready;
  // @TODO:
  // not ready -> ready status change should be triggered by clicking on 'I'm ready' in menu's tab
  // DB should be updated on click
  // the summary page should pull from DB periodically to see whether that status has changed?
  const allowButtonStyle = { margin: 0, marginRight: 10, backgroundColor: colors.brand.beachLight };
  const denyButtonStyle = { margin: 0, backgroundColor: colors.brand.kazanLight };

  const profilePicturePath = '../../../../assets/femaleUser.png';

  const handleAllowGuest = () => {
    // @TODO: update DB to include user as guest in transaction
    setStatus('not ready');
  };

  const handleDenyGuest = () => {
    // @TODO: update DB to set 'request pending' back to false?
    const updatedGuests = guests.filter((g) => g.name !== guest.item.name);
    dispatch({ type: 'SET_GUESTS', guests: updatedGuests });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={require(profilePicturePath)} style={styles.profile}/>
        {accountHolderName !== guest.item.name
          ? <Text>{guest.item.name}</Text>
          : <Text>You</Text>
        }

      </View>
      {(status === 'access' && accountHolderName !== guest.item.name)
        ?
        <View style={styles.buttonContainer}>
          <BiteshareButton size={70} title='Allow' buttonStyle={allowButtonStyle} onPress={handleAllowGuest} />
          <BiteshareButton size={70} title='Deny' buttonStyle={denyButtonStyle} onPress={handleDenyGuest} />
        </View>
        :
        <View style={styles.buttonContainer}>
          <BiteshareButton size={70} title='Not Ready' buttonStyle={{ margin: 0 }} disabled={true} />
        </View>
      }
    </View>
  );
};

export default Guest;