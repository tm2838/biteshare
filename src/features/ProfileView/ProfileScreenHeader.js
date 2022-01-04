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

const ProfileScreenHeader = () => {
  const navigation = useNavigation();
  const route = useRoute();
  let previousScreen = route.name === 'Profile' ? 'Explore' : '';
  const handleBackButton = () => navigation.navigate(previousScreen);
  return (
    <Appbar.Header style={styles.profileScreenHeader}>
      <Appbar.BackAction onPress={handleBackButton} color="white" />
    </Appbar.Header>
  );
};

export default ProfileScreenHeader;