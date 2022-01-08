import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { colors } from '../../../infrastructure/colors';
import { BiteShareContext } from '../../../BiteShareContext';
import { signOutUser } from '../../../../firebase/helpers/authentication.firebase';

import SafeArea from '../../../components/SafeArea';
import UserPhoto from './AccountPhoto';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    height: '90%',
  },
});

const AccountScreen = () => {

  return (
    <SafeArea>
      <View >
        <View style={styles.container}>
          <UserPhoto></UserPhoto>

        </View>
      </View>
    </SafeArea>
  );
};

export default AccountScreen;

//photo
//