import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { colors } from '../../../infrastructure/colors.js';
import { BiteShareContext } from '../../../BiteShareContext.js';
import { getADocReferenceFromCollection, readASingleDocument } from '../../../../firebase/helpers/database.firebase.js';
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
    width: 150,
    marginBottom: 40,
    padding: 15,
    borderRadius: 50,
    backgroundColor: colors.brand.ebisuLight,
    borderColor: colors.brand.beach,
    borderWidth: 1
  }
});

const CurrentSessionBills = ({ changeTab }) => {

  const { state: { accountHolderName, nickname, sessionId, orderedItems }, dispatch } = useContext(BiteShareContext);
  const [individualBill, setIndividualBill] = useState(0);
  const [totalBill, setTotalBill] = useState(0);
  const tipPercentages = [0.1, 0.15, 0.2];

  //function to add tax- 7.25%
  const addTax = (bill) => (bill * .0725) + bill;

  const getIndividualBill = () => {
    getADocReferenceFromCollection(`transactions/${sessionId}/attendees`, 'name', '==', nickname || accountHolderName)
      .then((qResult) => {
        qResult.forEach((doc) => {
          readASingleDocument(`transactions/${sessionId}/attendees`, doc.id)
            .then((singleDoc) => {
              setIndividualBill(singleDoc.data().individualBills);
            });
        });
      })
      .catch(err => console.log('Error in getIndividualBill: ', err));
  };

  const getTotalBill = () => {
    readASingleDocument('transactions', sessionId)
      .then((doc) => {
        setTotalBill(doc.data().totalBills);
      })
      .catch(err => console.log('Error in getTotalBill: ', err));
  };

  useEffect(() => {
    getIndividualBill();
    getTotalBill();
  }, [orderedItems]);

  const [selected, setSelected] = useState(null);

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

      <TouchableOpacity style={styles.paymentButton}>
        <Text style={{ textAlign: 'center', color: colors.brand.rausch, fontWeight: 'bold' }}>Make Payment</Text>
      </TouchableOpacity>

    </View>
  );
};

export default CurrentSessionBills;