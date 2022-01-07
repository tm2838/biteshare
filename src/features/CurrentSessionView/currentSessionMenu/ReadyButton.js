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
  const { state: { sessionId, orderedItems, accountHolderName, nickname, accountHolderReady }, dispatch } = useContext(BiteShareContext);
  const [orderReady, SetOrderReady] = useState(false);
  const calculateItemPrice = (items) => items.reduce((totalPrice, item) => totalPrice + item.price, 0);
  let differenceInBill = 0;

  const menuChoice = () => {
    const newBill = parseFloat(calculateItemPrice(orderedItems).toFixed(2));
    getADocReferenceFromCollection(`transactions/${sessionId}/attendees`, 'name', '==', nickname || accountHolderName)
      .then((qResult) => {
        qResult.forEach((doc) => {
          differenceInBill = newBill - doc.data().individualBills;
          updateADocument(`transactions/${sessionId}/attendees`, doc.id, {
            orderStatus: 'ready',
            individualBills: newBill,
            orderedItems: [...orderedItems]
          });
        });
      })
      .catch((error) => {
        console.log('Error marking order status: ', error);
      })
      .then(() => readASingleDocument('transactions', sessionId))
      .then((result) => {
        const originalBill = result.data().totalBills;
        updateADocument('transactions', sessionId, {
          totalBills: originalBill + differenceInBill,
        });
      })
      .catch((error) => {
        console.log('Error updating total bill: ', error);
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