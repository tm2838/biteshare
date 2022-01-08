import React, { useContext } from 'react';
import { colors } from '../../../infrastructure/colors';
import { StyleSheet, Text, View, FlatList} from 'react-native';

import AccountInfo from './AccountInputRow';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: 400,
    height: '45%',
    margin: 10,
    padding: 10,
    justifyContent: 'space-around',

    // borderWidth: 1,
    // borderColor: 'black'
  },
  title: {
    flex: 1,
    fontSize: 25,
    fontWeight: 'bold',
  },
});


const UserBilling = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Method </Text>
      <AccountInfo heading={'CardNumber'} info={'5555 5555 5555 5555'}></AccountInfo>
      <AccountInfo heading={'Expiration'} info={'01/22'}></AccountInfo>
      <AccountInfo heading={'Security Code'} info={'123'}></AccountInfo>

    </View>

  );
};

export default UserBilling;