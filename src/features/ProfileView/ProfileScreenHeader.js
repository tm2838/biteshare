import React from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { colors } from '../../infrastructure/colors';


const styles = StyleSheet.create({
  profileScreenHeader: {
    backgroundColor: colors.brand.kazan
  }
});

const ProfileScreenHeader = ({ currentPage, navPage }) => {
  const navigation = useNavigation();
  const route = useRoute();
  let previousScreen = route.name === 'Profile' ? 'Explore' : '';
  const handleBackButton = () => navigation.navigate(previousScreen);


  let handlePress = () => {
    navPage('Profile');
  };

  const renderBackButton = () => {
    if (currentPage === 'Profile') {
      return (
        <Appbar.BackAction onPress={handleBackButton} color="white" />
      );
    } else if (currentPage === 'Account') {
      return (
        <Appbar.BackAction onPress={handlePress} color="white" />
      );
    }
  };

  return (
    <Appbar.Header style={styles.profileScreenHeader}>

      {renderBackButton()}
    </Appbar.Header>
  );
};

export default ProfileScreenHeader;

