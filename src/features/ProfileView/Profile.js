import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
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
    flex: .5

  },
  logout: {
    flex: .1,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    color: colors.brand.kazan,
    backgroundColor: colors.brand.beach,
  }
});

const Profile = ({ navPage }) => {
  const { state: { authenticated }, dispatch } = useContext(BiteShareContext);

  const navigation = useNavigation();
  const logout = () => {
    signOutUser()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch(err => {
        console.log(err);
      });
    dispatch({ type: 'SET_AUTH', authenticated: false });
  };

  return (
    <SafeArea>
      <View >
        <ProfileScreenHeader />
        <View style={styles.container}>
          <ProfileGreeting style={styles.greeting}/>
          <ProfileHistory style={styles.history}/>
          <SettingButton style={styles.settings} navPage={navPage} />
          <TouchableOpacity
            style={styles.logout}
            onPress={logout}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeArea>
  );
};

export default Profile;
