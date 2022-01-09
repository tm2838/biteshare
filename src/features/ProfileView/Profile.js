import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import SafeArea from '../../components/SafeArea';
import ProfileScreenHeader from './ProfileScreenHeader';
import ProfileGreeting from './Profile.Greeting';
import ProfileHistory from './Profile.History';
import SettingButton from './ProfileSettingsButton';
import LogoutModal from '../../components/LogoutModal.js';

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
  settings: {
    flex: .1
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
  const [modalVisible, setModalVisible] = useState(false);
  const { dispatch } = useContext(BiteShareContext);

  const navigation = useNavigation();

  return (
    <SafeArea>
      <View >
        <View style={styles.container}>
          <ProfileGreeting style={styles.greeting} />
          <ProfileHistory style={styles.history} />
          <SettingButton style={styles.settings} navPage={navPage} />
          <TouchableOpacity
            style={styles.logout}
            onPress={() => setModalVisible(true)}
          >
            <Text>Logout</Text>
          </TouchableOpacity>
          <LogoutModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </View>
      </View>
    </SafeArea>
  );
};

export default Profile;
