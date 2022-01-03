import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import SafeArea from '../../components/SafeArea';
import ProfileScreenHeader from './ProfileScreenHeader';
import ProfileGreeting from './Profile.Greeting';
import ProfileHistory from './Profile.History';
import SettingButton from './ProfileSettingsButton';

import { colors } from '../../infrastructure/colors';
import { BiteShareContext } from '../../BiteShareContext';
import { signOutUser } from '../../../firebase/helpers/authentication.firebase';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    height: '90%',

  },
  greeting: {
    alignItems: 'center',
    flexDirection: 'column',
    height: 20,
    flex: 2
  },
  history: {

  },
  settings: {

  },
  logout: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    color: colors.brand.kazan,
    backgroundColor: colors.brand.beach,
  }
});

const ProfileScreen = () => {
  const { state: { authenticated }, dispatch } = useContext(BiteShareContext);
  const navigation = useNavigation();

  return (
    <SafeArea>
      <View >
        <ProfileScreenHeader />
        <View style={styles.container}>
          <Text>THIS IS THE ACCOUNT SETTINGS PAGE</Text>

        </View>
      </View>
    </SafeArea>
  );
};

export default ProfileScreen;


// TODO
// ** Ensure back nav button directs to profile page
// ** Render Components
