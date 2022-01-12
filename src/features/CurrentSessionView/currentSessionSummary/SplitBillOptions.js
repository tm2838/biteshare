import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { updateADocument, getADocReferenceFromCollection, readASingleDocument } from '../../../../firebase/helpers/database.firebase.js';
import BiteshareButton from '../../../components/BiteshareButton.js';
import { colors } from '../../../infrastructure/colors.js';
import { BiteShareContext } from '../../../BiteShareContext.js';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  titleContainer: {
    borderRadius: 5,
    backgroundColor: '#C4C4C4',
    padding: 15,
    height: 60,
    width: 400,
  },
  title: {
    fontSize: 20,
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5
  }
});

const SplitBillOptions = ({ changeTab }) => {
  const navigation = useNavigation();
  const { state: { isEveryoneReady, sessionId, guests }, dispatch } = useContext(BiteShareContext);
  const titleContainerStyle = isEveryoneReady ? [ styles.titleContainer, { backgroundColor: colors.brand.ebisuLight }] : styles.titleContainer;
  const buttonStyle = isEveryoneReady ? { backgroundColor: colors.brand.ebisuLight } : {};

  const handleSplitEvenly = (event) => {
    updateADocument('transactions', sessionId, {
      splitMethod: 'Evenly',
    })
      .catch((error) => {
        console.log('Error updating split method: ', error);
      })
      .then(() => readASingleDocument('transactions', sessionId))
      .then((result) => {
        const totalBill = result.data().totalBills;
        const guestCount = guests.filter(guest => guest.joinRequest === 'allowed').length;
        const updatedIndividualBill = totalBill / guestCount;
        guests.forEach((guest) => {
          getADocReferenceFromCollection(`transactions/${sessionId}/attendees`, 'name', '==', guest.name)
            .then((qResult) => {
              qResult.forEach((doc) => {
                if (doc.data().joinRequest === 'allowed') {
                  updateADocument(`transactions/${sessionId}/attendees`, doc.id, {
                    individualBills: updatedIndividualBill,
                  });
                }
              });
            })
            .catch((error) => {
              console.log('Error updating individual bill: ', error);
            });
        });
      })
      .then(() => {
        changeTab('Bills');
      });
  };

  const handleSplitByItem = (event) => {
    updateADocument('transactions', sessionId, {
      splitMethod: 'By item',
    })
      .catch((error) => {
        console.log('Error updating split method: ', error);
      })
      .then(() => {
        changeTab('Bills');
      });
  };

  return (
    <View style={styles.container}>
      <View style={titleContainerStyle}>
        <Text style={styles.title}>How do you want to split the bill?</Text>
      </View>
      <View style={styles.buttonContainer}>
        <BiteshareButton title='Evenly' buttonStyle={buttonStyle} onPress={handleSplitEvenly} testID='option-evenly' />
        <BiteshareButton title='By Item' buttonStyle={buttonStyle} onPress={handleSplitByItem} />
      </View>
    </View>
  );
};

export default SplitBillOptions;