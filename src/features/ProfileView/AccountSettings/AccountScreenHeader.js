import React from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { colors } from '../../../infrastructure/colors';


const styles = StyleSheet.create({
  profileScreenHeader: {
    backgroundColor: colors.brand.kazan
  }
});

const AccountScreenHeader = ({ navPage }) => {
  // const navigation = useNavigation();
  // const route = useRoute();
  // let previousScreen = route.name === 'Profile' ? 'Profile' : '';
  // const handleBackButton = () => navigation.navigate(previousScreen);

  return (
    <Appbar.Header style={styles.profileScreenHeader}>
      {/* <Appbar.BackAction onPress={navPage('Profile')} color="white" /> */}
      <Appbar.BackAction color="white" />

    </Appbar.Header>
  );
};

export default AccountScreenHeader;