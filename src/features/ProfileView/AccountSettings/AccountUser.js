import React, { useContext } from 'react';
import { colors } from '../../../infrastructure/colors';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import { BiteShareContext } from '../../../BiteShareContext';

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

    borderWidth: 1,
    borderColor: 'black'
  },
  title: {
    flex: 1,
    fontSize: 25,
    fontWeight: 'bold',
  },
  info: {

  }
});


const UserInfo = () => {
  const { state: { nickname, accountHolderName, email }, dispatch } = useContext(BiteShareContext);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Account Information </Text>

      <AccountInfo heading={'Username'} info={'User'}></AccountInfo>
      <AccountInfo heading={'Email'} info={'user@user.com'}></AccountInfo>
      <AccountInfo heading={'Password'} info={'12345'}></AccountInfo>

    </View>

  );
};

export default UserInfo;