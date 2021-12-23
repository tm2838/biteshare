import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';
import { colors } from '../../../infrastructure/colors.js';
import BiteshareButton from '../../../components/BiteshareButton.js';
import { BiteShareContext } from '../../../BiteShareContext.js';

const styles = StyleSheet.create({
  container: {
    height: 50,
    margin: 5,
    padding: 10,
    backgroundColor: colors.brand.ebisuLight2,
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
  },
  hiddenView: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: colors.brand.rausch,
    height: 50,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});

const Guest = ({ guest }) => {
  const { state: { accountHolderName, accountType, guests }, dispatch } = useContext(BiteShareContext);
  const [status, setStatus] = useState('access'); // status: access/ready/not ready;
  // @TODO:
  // not ready -> ready status change should be triggered by clicking on 'I'm ready' in menu's tab
  // DB should be updated on click
  // the summary page should pull from DB periodically to see whether that status has changed?
  const allowButtonStyle = { margin: 0, marginRight: 10, backgroundColor: colors.brand.beachLight };
  const denyButtonStyle = { margin: 0, backgroundColor: colors.brand.kazanLight };

  const swipeable = accountHolderName !== guest.name && status !== 'access' && accountType !== 'GUEST';
  const profilePicturePath = '../../../../assets/femaleUser.png';

  const hostViewAccessStage = status === 'access' && accountHolderName !== guest.name && accountType === 'HOST';
  const accountHolderOrderStage = status !== 'access' && accountType === 'HOST';
  const guestView = accountType === 'GUEST' && accountHolderName === guest.name;

  useEffect(() => {
    if (accountType === 'HOST' && accountHolderName === guest.name) {
      setStatus('not ready');
    }
  }, [accountType, accountHolderName]);

  const handleAllowGuest = () => {
    // @TODO: update DB to include user as guest in transaction
    setStatus('not ready');
  };

  const handleDenyGuest = () => {
    // @TODO: update DB to set 'request pending' back to false?
    const updatedGuests = guests.filter((g) => g.name !== guest.name);
    dispatch({ type: 'SET_GUESTS', guests: updatedGuests });
  };

  return (
    <SwipeRow rightOpenValue={-80} disableRightSwipe disableLeftSwipe={!swipeable}>

      <View style={styles.hiddenView} >
        <Text></Text>
        <Text onPress={handleDenyGuest}>Remove</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image source={require(profilePicturePath)} style={styles.profile}/>
          <Text>{accountHolderName === guest.name ? 'You' : guest.name }</Text>
        </View>
        {hostViewAccessStage
          &&
          <View style={styles.buttonContainer}>
            <BiteshareButton size={70} title='Allow' buttonStyle={allowButtonStyle} onPress={handleAllowGuest} />
            <BiteshareButton size={70} title='Deny' buttonStyle={denyButtonStyle} onPress={handleDenyGuest} />
          </View>
        }
        {accountHolderOrderStage
          &&
          <View style={styles.buttonContainer}>
            <BiteshareButton size={70} title='Not Ready' buttonStyle={{ margin: 0 }} disabled={true} />
          </View>
        }
        {guestView
          &&
          <View style={styles.buttonContainer}>
            <BiteshareButton size={70} title='Not Ready' buttonStyle={{ margin: 0 }} disabled={true} />
          </View>
        }
      </View>

    </SwipeRow>
  );
};

export default Guest;