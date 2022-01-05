import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import SafeArea from '../../components/SafeArea';
import ProfileScreenHeader from './ProfileScreenHeader';
import ProfileGreeting from './Profile.Greeting';
import ProfileHistory from './Profile.History';
import SettingButton from './Profile.Settings';
import LogoutModal from '../../components/LogoutModal.js';

import { colors } from '../../infrastructure/colors';
import { BiteShareContext } from '../../BiteShareContext';
import { updateADocument } from '../../../firebase/helpers/database.firebase';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    height: '85%',

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
  const { state: { authenticated, sessionId }, dispatch } = useContext(BiteShareContext);
  const [modalVisible, setModalVisible] = useState(false);

  // const logout = () => {
  //   updateADocument(`transactions/${sessionId}/attendees`, doc.id, {
  //     orderStatus: 'ready',
  //     individualBills: newBill,
  //     orderedItems: [...orderedItems]
  //   });
  //   signOutUser()
  //     .then(() => {
  //       navigation.navigate('Login');
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  //   dispatch({ type: 'SET_AUTH', authenticated: false });
  // };

  // const logoutConfirmation = () => {
  //   if (sessionId) {
  //     setModalVisible(true);
  //   } else {

  //   }
  // };

  return (
    <SafeArea>
      <View >
        <ProfileScreenHeader />
        <View style={styles.container}>

          <ProfileGreeting style={styles.greeting} />

          <LogoutModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />

          <ProfileHistory style={styles.history} />

          <SettingButton style={styles.settings} />

          <TouchableOpacity
            style={styles.logout}
            onPress={() => setModalVisible(true)}
          >
            <Text>Logout</Text>
          </TouchableOpacity>

        </View>
      </View>
    </SafeArea>
  );
};

export default ProfileScreen;


//TODO
//Add component for user greeting w/ image and join date
//Map transaction history from db data
//Click account settings button and navigate to settings page