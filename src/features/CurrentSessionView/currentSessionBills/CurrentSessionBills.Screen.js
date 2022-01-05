import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, FlatList } from 'react-native';
import { colors } from '../../../infrastructure/colors.js';
import { BiteShareContext } from '../../../BiteShareContext.js';
import { getADocReferenceFromCollection, readASingleDocument } from '../../../../firebase/helpers/database.firebase.js';
import OrderedItemInfo from './OrderedItemInfo.js';


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
    marginTop: 20
  },

  individualBill: {
    paddingBottom: 10,
    color: colors.brand.rausch,
    fontWeight: 'bold'
  },

  tip: {
    textAlign: 'center',
    width: 300,
    padding: 7,
    marginBottom: 10,
    backgroundColor: colors.brand.ebisu,
    color: colors.brand.darkBlue
  },

  paymentButton: {
    width: 150,
    marginTop: 40,
    padding: 15,
    borderRadius: 50,
    backgroundColor: colors.brand.ebisuLight,
    borderColor: colors.brand.sessionTab,
    borderWidth: 1
  }
});

const CurrentSessionBills = ({ changeTab }) => {

  const { state: { accountHolderName, sessionId, orderedItems }, dispatch } = useContext(BiteShareContext);
  const [individualBill, setIndividualBill] = useState(0);
  const [totalBill, setTotalBill] = useState(0);

  const getTotalBill = () => {
    readASingleDocument('transactions', sessionId)
      .then((doc) => {
        setTotalBill(doc.data().totalBills);
      })
      .catch(err => console.log('Error in getTotalBill: ', err));
  };

  const getIndividualBill = () => {
    getADocReferenceFromCollection(`transactions/${sessionId}/attendees`, 'name', '==', accountHolderName)
      .then((qResult) => {
        qResult.forEach((doc) => {
          readASingleDocument(`transactions/${sessionId}/attendees`, doc.id)
            .then((singleDoc) => {
              // console.log('individualBills: ', singleDoc.data().individualBills);
              setIndividualBill(singleDoc.data().individualBills);
            });
        });
      })
      .catch((err) => {
        console.log('Error in getIndividualBill: ', err);
      });
  };

  //function to add tax- 7.25%
  const addTax = (bill) => (bill * .0725) + bill;

  //function to add tip
  const addTip = (bill, percent) => (bill * percent) + bill;

  useEffect(() => {
    getIndividualBill();
    getTotalBill();
  }, [orderedItems]);

  console.log('individualBill: ', individualBill);
  console.log('orderedItems: ', orderedItems);
  console.log('totalBill: ', totalBill);


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
        <Text style={styles.individualBill}>{`Your share is: $${Math.trunc(addTax(individualBill))} (incl. tax)`}</Text>
        <Text>{`Total bill is: $${Math.trunc(addTax(totalBill))}`}</Text>
      </View>

      <View>
        <TouchableOpacity>
          <Text style={styles.tip}>Add 10% tip: $15</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.tip}>Add 15% tip: $17</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.tip}>Add 20% tip: $19</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.paymentButton}>
        <Text style={{ textAlign: 'center', color: colors.brand.rausch, fontWeight: 'bold' }}>Make Payment</Text>
      </TouchableOpacity>

    </View>
  );
};

export default CurrentSessionBills;