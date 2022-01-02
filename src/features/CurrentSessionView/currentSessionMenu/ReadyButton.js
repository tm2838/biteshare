import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BiteshareButton from '../../../components/BiteshareButton.js';
import { colors } from '../../../infrastructure/colors.js';
import { BiteShareContext } from '../../../BiteShareContext.js';
import { updateADocument, getADocReferenceFromCollection, readASingleDocument } from '../../../../firebase/helpers/database.firebase.js';
// import CurrentSession from '../CurrentSession.Screen';

const styles = StyleSheet.create({

  container: {
    alignItems: 'center',
    marginTop: 5,
  },

});

const ReadyButton = ({changeTab}) => {

  const navigation = useNavigation();
  const { state: { sessionId, orderedItems, accountHolderName }, dispatch } = useContext(BiteShareContext);
  const [orderReady, SetOrderReady] = useState(false);
  const calculateItemPrice = (items) => items.reduce((totalPrice, item) => totalPrice + item.price, 0);

  const menuChoice = () => {
    const newBill = calculateItemPrice(orderedItems);
    getADocReferenceFromCollection(`transactions/${sessionId}/attendees`, 'name', '==', accountHolderName)
      .then((qResult) => {
        qResult.forEach((doc) => {
          updateADocument(`transactions/${sessionId}/attendees`, doc.id, {
            orderStatus: 'ready',
            individualBills: newBill,
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
          totalBills: originalBill + newBill,
        });
      })
      .catch((error) => {
        console.log('Error updating total bill: ', error);
      });
    changeTab('Summary');

    //@TODO ****
    // When user click 'ready'
    // orderedItem will be updated to firestore (PUT transaction collection by sessionId)
    // search with sessionId (transactions_id from firestore)
    // once there is a match with sessionId (transactions_id : 1234)
    // update - { name: 'Greg', userId: 8776, ready: True, orderedItem:[{menuName: 'pizza', menuDescription:'small', menuPrice: 12.95}]} under 'transaction' collections
    // redirect to summary page (Can guest can see if everyone ready or not? )
  };

  return (
    <View style={styles.container}>
      <BiteshareButton
        title={'I\'m Ready'}
        buttonStyle={orderedItems.length === 0 ? { backgroundColor: 'lightgrey' } : { backgroundColor: colors.brand.beachLight } }
        onPress={menuChoice} />
    </View>
  );
};

export default ReadyButton;