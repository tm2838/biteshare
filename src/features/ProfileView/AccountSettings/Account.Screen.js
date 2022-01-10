import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { colors } from '../../../infrastructure/colors';
import { BiteShareContext } from '../../../BiteShareContext';
import { signOutUser } from '../../../../firebase/helpers/authentication.firebase';

import SafeArea from '../../../components/SafeArea';
import UserPhoto from './AccountPhoto';
import UserInfo from './AccountUser';
import UserBilling from './AccountPayment';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    height: '92%',

    // borderWidth: 1,
    // borderColor: 'black'
  },
  picture: {
    flex: .1,
    borderWidth: 1,
    borderColor: 'black'
  },
  inputs: {
    flex: .1,
    borderWidth: 1,
    borderColor: 'black'
  }
});

const AccountScreen = () => {

  return (
    <SafeArea>
      <View >
        <View style={styles.container}>
          <UserPhoto style={styles.picture}></UserPhoto>
          <UserInfo style={styles.inputs}></UserInfo>
          <UserBilling style={styles.inputs}></UserBilling>

        </View>
      </View>
    </SafeArea>
  );
};

export default AccountScreen;

//photo
//