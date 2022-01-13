import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { colors } from '../../../infrastructure/colors.js';
import { BiteShareContext } from '../../../BiteShareContext.js';
import { getADocReferenceFromCollection, readASingleDocument, readDocSnapshotListener, updateADocument } from '../../../../firebase/helpers/database.firebase.js';
import OrderedItemInfo from './OrderedItemInfo.js';
import TipInfo from './TipInfo.js';


const styles = StyleSheet.create({
  billsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  orderedItemsContainer: {
    height: 200,
    backgroundColor: colors.brand.kazanLight2,
    margin: 15,
    marginTop: 40,
    padding: 40,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 40
  },

  priceContainer: {
    alignItems: 'center',
    margin: 50,
    marginTop: 20,
    marginBottom: 35
  },

  individualBill: {
    paddingBottom: 10,
    color: colors.brand.rausch,
    fontWeight: 'bold'
  },

  paymentButton: {
    margin: 10,
    marginBottom: 60,
    width: '80%',
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.brand.rausch,
    justifyContent: 'center'
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    letterSpacing: 1
  },
});

const CurrentSessionBills = ({ changeTab }) => {

  const { state: { accountHolderName, nickname, sessionId, orderedItems, email, userId, restaurauntName }, dispatch } = useContext(BiteShareContext);
  const [individualBill, setIndividualBill] = useState(0);
  const [totalBill, setTotalBill] = useState(0);
  const [selected, setSelected] = useState(null);
  const tipPercentages = [0.1, 0.15, 0.2];

  //function to add tax- 7.25%
  const addTax = (bill) => (bill * .0725) + bill;

  const getIndividualBill = () => {
    getADocReferenceFromCollection(`transactions/${sessionId}/attendees`, 'name', '==', nickname || accountHolderName)
      .then((qResult) => {
        qResult.forEach((doc) => {
          readDocSnapshotListener(`transactions/${sessionId}/attendees`, doc.id, (singleDoc) => {
            setIndividualBill(singleDoc.data().individualBills);
          });
        });
      })
      .catch(err => console.log('Error in getIndividualBill: ', err));
  };

  const getTotalBill = () => {
    readDocSnapshotListener('transactions', sessionId, (doc) => {
      setTotalBill(doc.data().totalBills);
    });
  };

  useEffect(() => {
    if (sessionId) {
      getTotalBill();
      getIndividualBill();
    }
  }, [sessionId]);

  const handleEndSession = () => {
    getADocReferenceFromCollection(`users/${userId}/transactions`, 'sessionId', '==', sessionId)
      .then((results) => {
        results.forEach((sessionDoc) => {
          updateADocument(`users/${userId}/transactions`, sessionDoc.id, {
            isCurrent: false,
            individualBills: individualBill,
            restaurantName: restaurantName,
          })
            .then(() => {
              console.log('Successfully added the transaction for current user');
            })
            .catch((error) => {
              console.log('Error adding the transaction for current user');
            });
        });
      });
  };

  return (
    <View style={styles.billsContainer}>

      <View style={styles.orderedItemsContainer}>
        <FlatList
          data={orderedItems}
          renderItem={({ item, index }) => <OrderedItemInfo orderedItem={item} />}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={() => <View style={{ padding: 10 }}></View>}
        />
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.individualBill}>{`Your share is: $${addTax(individualBill).toFixed(2)} (incl. tax)`}</Text>
        <Text>{`Total bill is: $${addTax(totalBill).toFixed(2)} (incl. tax)`}</Text>
      </View>

      <FlatList
        data={tipPercentages}
        renderItem={
          ({ item, index }) => <TipInfo
            tipPercentage={item}
            individualBill={individualBill}
            index={index}
            selected={selected}
            setSelected={setSelected}
          />
        }
        keyExtractor={(item, index) => index}
        ItemSeparatorComponent={() => <View style={{ padding: 7 }}></View>}
        scrollEnabled={false}
      />

      <TouchableOpacity style={styles.paymentButton} onPress={handleEndSession}>
        <Text style={styles.buttonText}>MAKE PAYMENT</Text>
      </TouchableOpacity>

    </View>
  );
};

export default CurrentSessionBills;