import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import SafeArea from '../../components/SafeArea';
import ProfileScreenHeader from './ProfileScreenHeader';
import ProfileGreeting from './Profile.Greeting';
import ProfileHistory from './Profile.History';
import SettingButton from './ProfileSettingsButton';

import Profile from './Profile';
import AccountScreen from './AccountSettings/Account.Screen';

import { colors } from '../../infrastructure/colors';
import { BiteShareContext } from '../../BiteShareContext';
import { updateADocument } from '../../../firebase/helpers/database.firebase';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
  },
});

const ProfileScreen = () => {
  const [currentPage, setCurrentPage] = useState('Profile');

  return (
    <SafeArea>
      <View >
        <ProfileScreenHeader navPage={setCurrentPage} currentPage={currentPage} />
        <View style={styles.container}>
          {currentPage === 'Profile' && <Profile navPage={setCurrentPage} />}
          {currentPage === 'Account' && <AccountScreen />}
        </View>
      </View>
    </SafeArea>
  );
};

export default ProfileScreen;
