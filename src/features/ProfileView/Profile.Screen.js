import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import SafeArea from '../../components/SafeArea';
import ProfileScreenHeader from './ProfileScreenHeader';
import { colors } from '../../infrastructure/colors';
import { BiteShareContext } from '../../BiteShareContext';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
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
  const logout = () => {
    dispatch({ type: 'SET_AUTH', authenticated: false });
  };
  return (
    <SafeArea>
      <View>
        <ProfileScreenHeader />
        <View style={styles.container}>
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

export default ProfileScreen;