import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BiteshareButton from '../../../components/BiteshareButton.js';
import { colors } from '../../../infrastructure/colors.js';
import { BiteShareContext } from '../../../BiteShareContext.js';
import { updateADocument, getADocReferenceFromCollection, readASingleDocument } from '../../../../firebase/helpers/database.firebase.js';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 5,
  },
});

const ReadyButton = ({ changeTab }) => {
  const { state: { sessionId, orderedItems, accountHolderName, nickname, accountHolderReady, guests }, dispatch } = useContext(BiteShareContext);
  const [orderReady, SetOrderReady] = useState(false);
  const calculateItemPrice = (items) => items.reduce((totalPrice, item) => totalPrice + item.price, 0);
  let differenceInBill = 0;

  const menuChoice = () => {
    const newBill = parseFloat(calculateItemPrice(orderedItems).toFixed(2));
    let newTotalBill = 0;
    readASingleDocument('transactions', sessionId)
    .then((currentTransaction) => {
      getADocReferenceFromCollection(`transactions/${sessionId}/attendees`, 'name', '==', nickname || accountHolderName)
      .then((qResult) => {
        qResult.forEach((doc) => {
          differenceInBill = newBill - parseFloat(calculateItemPrice(doc.data().orderedItems).toFixed(2));
          const originalBill = currentTransaction.data().totalBills;
          newTotalBill = originalBill + differenceInBill;
          updateADocument('transactions', sessionId, {
            totalBills: newTotalBill,
          })
          .then(() => {
            if (currentTransaction.data().splitMethod !== 'Evenly') {
              updateADocument(`transactions/${sessionId}/attendees`, doc.id, {
                orderStatus: 'ready',
                individualBills: newBill,
                orderedItems: [...orderedItems]
              });
            } else {
              updateADocument(`transactions/${sessionId}/attendees`, doc.id, {
                orderStatus: 'ready',
                orderedItems: [...orderedItems]
              })
              .then(() => {
                guests.forEach((guest) => {
                  getADocReferenceFromCollection(`transactions/${sessionId}/attendees`, 'name', '==', guest.name)
                    .then((qResult) => {
                      qResult.forEach((doc) => {
                        if (doc.data().joinRequest === 'allowed') {
                          console.log(currentTransaction.data().totalBills);
                          updateADocument(`transactions/${sessionId}/attendees`, doc.id, {
                            individualBills: newTotalBill / guests.filter(guest => guest.joinRequest === 'allowed').length,
                          });
                        }
                      });
                    })
                    .catch((error) => {
                      console.log('Error updating individual bill: ', error);
                    });
                });
              })
            }
          })
        })
      })
    })
      .then(() => {
        dispatch({ type: 'SET_ACCOUNT_HOLDER_READY', accountHolderReady: true });
        changeTab('Summary');
      });
  };

  return (
    <View style={styles.container}>
      <BiteshareButton
        title={'I\'m Ready'}
        buttonStyle={orderedItems.length === 0 ? { backgroundColor: 'lightgrey' } : { backgroundColor: colors.brand.beachLight } }
        onPress={menuChoice}
        disabled={orderedItems.length === 0}
      />
    </View>
  );
};

export default ReadyButton;