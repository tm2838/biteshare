import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { colors } from '../../../infrastructure/colors.js';
import { BiteShareContext } from '../../../BiteShareContext.js';
import { getADocReferenceFromCollection, readASingleDocument } from '../../../../firebase/helpers/database.firebase.js';



const styles = StyleSheet.create({
  billsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  orderedItemsContainer: {
    backgroundColor: colors.brand.kazanLight2,
    marginTop: 40,
    padding: 40,
    paddingTop: 60,
    paddingBottom: 60,
    borderRadius: 40
  },

  orderedItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  priceContainer: {
    alignItems: 'center',
    margin: 50
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
        <View style={styles.orderedItem}>
          <Text style={{ fontWeight: 'bold' }}>Mexican Food Item</Text>
          <Text style={{ fontWeight: 'bold' }}>$13.95</Text>
        </View>
        <Text>the description of the menu item goes here</Text>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.individualBill}>Your share is: $14.95 (incl. tax)</Text>
        <Text>Total bill is: $50.99</Text>
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