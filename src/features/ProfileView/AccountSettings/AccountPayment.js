import React, { useContext } from 'react';
import { colors } from '../../../infrastructure/colors';
import { StyleSheet, Text, View, FlatList} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: 400,
    height: '45%',
    margin: 10,
    padding: 10,
    justifyContent: 'space-around',

    borderWidth: 1,
    borderColor: 'black'
  },
  title: {
    flex: .2,
    fontSize: 25,
    fontWeight: 'bold',
  },
});


const UserBilling = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Method </Text>

      <Text>CardNumber: </Text>
      <Text>Expiration: </Text>
      <Text>Security Code: </Text>

    </View>

  );
};

export default UserBilling;