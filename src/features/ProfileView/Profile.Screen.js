import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SafeArea from '../../components/SafeArea';
import ProfileScreenHeader from './ProfileScreenHeader';

const ProfileScreen = () => {
  return (
    <SafeArea>
      <View>
        <ProfileScreenHeader />
      </View>
    </SafeArea>
  );
};

export default ProfileScreen;