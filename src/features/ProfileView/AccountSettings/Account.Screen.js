import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import SafeArea from '../../../components/SafeArea';

import { colors } from '../../../infrastructure/colors';
import { BiteShareContext } from '../../../BiteShareContext';
import { signOutUser } from '../../../../firebase/helpers/authentication.firebase';

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
          <Text>THIS IS THE ACCOUNT SETTINGS PAGE</Text>

        </View>
      </View>
    </SafeArea>
  );
};

export default AccountScreen;

