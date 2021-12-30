import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';
import { colors } from '../../../infrastructure/colors.js';
import BiteshareButton from '../../../components/BiteshareButton.js';
import { BiteShareContext } from '../../../BiteShareContext.js';
import MenuItemCard from '../../../components/MenuItemCard.js';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  guestContainer: {
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
    marginRight: '25%'
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
  const profilePicturePath = '../../../../assets/femaleUser.png';
  const { state: { accountHolderName, accountType, guests }, dispatch } = useContext(BiteShareContext);
  const [itemPrice, setItemPrice] = useState(0);
  const [rowDisabled, setRowDisabled] = useState(false);
  const [showOrderedItem, setShowOrderedItem] = useState(false);
  const [status, setStatus] = useState('access'); // status: access/ready/not ready;
  // @TODO:
  // not ready -> ready status change should be triggered by clicking on 'I'm ready' in menu's tab
  // DB should be updated on click
  // the summary page should pull from DB periodically to see whether that status has changed?
  // or socket.io?
  const allowButtonStyle = { margin: 0, marginRight: 10, backgroundColor: colors.brand.beachLight };
  const denyButtonStyle = { margin: 0, backgroundColor: colors.brand.kazanLight };

  // 'swipe to remove guest' only when current user is host and the guest is granted access to the session
  const swipeable = accountHolderName !== guest.name && status !== 'access' && accountType !== 'GUEST';

  // host: access stage, should see allow/deny for everyone else
  const hostViewAccessStage = status === 'access' && accountHolderName !== guest.name && accountType === 'HOST';

  // host: order stage, should see status indicator for everyone
  const hostViewOrderStageNotReady = status === 'not ready' && accountType === 'HOST';
  const hostViewOrderStageReady = status === 'ready' && accountType === 'HOST';

  // guest: order stage, should see status indicator for self and not anyone else
  const guestView = accountType === 'GUEST' && accountHolderName === guest.name;

  useEffect(() => {
    if (accountHolderName === guest.name && guest.orderStatus === 'Not Ready') {
      setStatus('not ready');
    } else if (accountHolderName === guest.name && guest.orderStatus === 'Ready') {
      setStatus('ready');
    }
  }, [accountType, accountHolderName]);

  useEffect(() => {
    if (status === 'ready' && guest.orderedItems) {
      const currentPrice = guest.orderedItems.reduce((totalPrice, item) => totalPrice + item.price, 0);
      setItemPrice(currentPrice);
    }
  }, [status]);

  const handleAllowGuest = () => {
    // @TODO: update DB to include user as guest in transaction
    if (guest.orderStatus === 'Not Ready') {
      setStatus('not ready');
    } else if (guest.orderStatus === 'Ready') {
      setStatus('ready');
    }
  };

  const handleDenyGuest = () => {
    // @TODO: update DB to set 'request pending' back to false?
    const updatedGuests = guests.filter((g) => g.name !== guest.name);
    dispatch({ type: 'SET_GUESTS', guests: updatedGuests });
  };

  const handleRowSwiped = () => {
    setRowDisabled(true);
  };

  const handleRowClose = () => {
    setRowDisabled(false);
  };

  const handleShowOrderedItem = () => {
    setShowOrderedItem(!showOrderedItem);
  };

  return (
    <View style={styles.container}>
      <SwipeRow
        rightOpenValue={-80}
        disableRightSwipe
        disableLeftSwipe={!swipeable}
        onRowOpen={handleRowSwiped}
        onRowClose={handleRowClose}
      >
        <View style={styles.hiddenView} >
          <Text></Text>
          <Text onPress={handleDenyGuest}>Remove</Text>
        </View>

        <Pressable style={styles.guestContainer} onPress={handleShowOrderedItem} disabled={rowDisabled}>
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

          {hostViewOrderStageNotReady
            &&
            <View style={styles.buttonContainer}>
              <BiteshareButton size={70} title='Not Ready' buttonStyle={{ margin: 0 }} disabled={true} />
            </View>
          }

          {hostViewOrderStageReady
            &&
            <View style={styles.buttonContainer}>
              <BiteshareButton size={70} title='Ready' buttonStyle={allowButtonStyle} disabled={true} />
              <Text style={{ marginLeft: '25%' }}>{`$${itemPrice}`}</Text>
            </View>
          }

          {guestView
            &&
            <View style={styles.buttonContainer}>
              <BiteshareButton size={70} title='Not Ready' buttonStyle={{ margin: 0 }} disabled={true} />
            </View>
          }
        </Pressable>
      </SwipeRow>
      {showOrderedItem && guest?.orderedItems?.length && <MenuItemCard menuItems={guest.orderedItems} />}
    </View>
  );
};

export default Guest;