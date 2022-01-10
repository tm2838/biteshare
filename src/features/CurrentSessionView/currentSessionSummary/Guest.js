import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';
import { colors } from '../../../infrastructure/colors.js';
import BiteshareButton from '../../../components/BiteshareButton.js';
import { BiteShareContext } from '../../../BiteShareContext.js';
import MenuItemCard from '../../../components/MenuItemCard.js';
import { updateADocument, getADocReferenceFromCollection, readASingleDocument, deleteADocument } from '../../../../firebase/helpers/database.firebase.js';

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
  const { state: { accountHolderName, accountType, guests, orderedItems, sessionId, nickname }, dispatch } = useContext(BiteShareContext);
  const [rowDisabled, setRowDisabled] = useState(false);
  const [showOrderedItem, setShowOrderedItem] = useState(false);
  const [presplitBill, setPresplitBill] = useState(0);

  const allowButtonStyle = { margin: 0, marginRight: 10, backgroundColor: colors.brand.beachLight };
  const denyButtonStyle = { margin: 0, backgroundColor: colors.brand.kazanLight };

  // 'swipe to remove guest' only when current user is host and the guest is granted access to the session
  const swipeable = accountHolderName !== guest.name && accountType !== 'GUEST' && guest.joinRequest === 'allowed';

  // host: access stage, should see allow/deny for everyone else
  const hostViewAccessStage = guest.joinRequest === 'pending' && accountHolderName !== guest.name && accountType === 'HOST';

  // host: order stage, should see status indicator for everyone
  const hostViewOrderStageNotReady = guest.orderStatus === 'not ready' && (guest.joinRequest === 'allowed' || guest.name === accountHolderName) && accountType === 'HOST';
  const hostViewOrderStageReady = guest.orderStatus === 'ready' && (guest.joinRequest === 'allowed' || guest.name === accountHolderName) && accountType === 'HOST';

  // guest: order stage, should see status indicator for self and not anyone else
  const guestView = accountType === 'GUEST' && (guest.name === accountHolderName || guest.name === nickname);
  const otherGuestView = accountType === 'GUEST' && (accountHolderName !== guest.name && guest.name !== nickname);

  const calculateItemPrice = (items) => items.reduce((totalPrice, item) => totalPrice + item.price, 0);

  useEffect(() => {
    if (guest.orderedItems.length && guest.orderStatus === 'ready') {
      setPresplitBill(parseFloat(calculateItemPrice(guest.orderedItems).toFixed(2)));
    }
  }, [guest.orderedItems]);

  useEffect(() => {
    setRowDisabled(guest.orderStatus === 'not ready');
  }, [guest.orderStatus]);

  const handleAllowGuest = () => {
    // @TODO: update DB USERS collection to add this currenct session to 'transactions' field
    getADocReferenceFromCollection(`transactions/${sessionId}/attendees`, 'name', '==', guest.name)
      .then((qResult) => {
        qResult.forEach((doc) => {
          updateADocument(`transactions/${sessionId}/attendees`, doc.id, {
            orderStatus: 'not ready',
            joinRequest: 'allowed',
          });
        });
      })
      .catch((error) => {
        console.log('Error allowing the guest: ', error);
      });
  };

  const handleDenyGuest = () => {
    // @TODO: update DB USERS collection to remove this currenct session from 'transactions' field
    let guestId;
    getADocReferenceFromCollection(`transactions/${sessionId}/attendees`, 'name', '==', guest.name)
      .then((qResult) => {
        qResult.forEach((doc) => {
          guestId = doc.data().userId;
          updateADocument(`transactions/${sessionId}/attendees`, doc.id, {
            joinRequest: 'denied',
            individualBills: 0,
          });
        });
      })
      .then(() => readASingleDocument('transactions', sessionId))
      .then((result) => {
        const originalBill = result.data().totalBills;
        updateADocument('transactions', sessionId, {
          totalBills: originalBill - presplitBill,
        });
      })
      .catch((error) => {
        console.log('Error denying the guest: ', error);
      })
      .then(() => {
        getADocReferenceFromCollection(`users/${guestId}/transactions`, 'sessionId', '==', sessionId)
          .then((results) => {
            results.forEach((doc) => {
              deleteADocument(`users/${guestId}/transactions`, doc.id)
                .then(() => {
                  console.log('Successfully removed the current transaction from user');
                })
                .catch((err) => {
                  console.log('Error removing the current transaction from user');
                });
            });
          });
      });
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
  // joinRequest !== 'denied'
  return guest.joinRequest !== 'denied' && (
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
            <Image source={require(profilePicturePath)} style={styles.profile} />
            <Text>{(guest.name === accountHolderName || guest.name === nickname) ? 'You' : guest.name}</Text>

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
              <Text style={{ marginLeft: 70 }}>${presplitBill}</Text>
            </View>
          }

          {guestView
            && (guest.orderStatus === 'not ready' ?
              <View style={styles.buttonContainer}>
                <BiteshareButton size={70} title='Not Ready' buttonStyle={{ margin: 0 }} disabled={true} />
              </View>
              : <View style={styles.buttonContainer}>
                <BiteshareButton size={70} title='Ready' buttonStyle={allowButtonStyle} disabled={true} />
                <Text style={{ marginLeft: 70 }}>${presplitBill}</Text>
              </View>)
          }
          {otherGuestView &&
            guest.orderStatus === 'ready' &&
            <View style={styles.buttonContainer}>
              <Text style={{ marginLeft: 150 }}>${presplitBill}</Text>
            </View>
          }
        </Pressable>
      </SwipeRow>
      {(showOrderedItem && guest?.orderedItems?.length > 0) && <MenuItemCard menuItems={guest.orderedItems} />}
    </View>

  );
};

export default Guest;