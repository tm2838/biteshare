import React from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../../infrastructure/colors';
import BackButton from '../../../components/BackButton';



const styles = StyleSheet.create({
  profileScreenHeader: {
    backgroundColor: colors.brand.kazan
  }
});

const AccountScreenHeader = ({ navPage }) => {
  const navigation = useNavigation();
  const route = useRoute();
  //Navigation using route
  let previousScreen = route.name === 'Account' ? 'Profile' : '';

  //Navigation using profile state


  const handleBackButton = () => navigation.navigate(previousScreen);


  return (
    <Appbar.Header style={styles.profileScreenHeader}>
      <BackButton screenName="Profile" />
      {/* <Appbar.BackAction onPress={navPage('Profile')} color="white" /> */}

      {/* <Appbar.BackAction onPress={handleBackButton} color="white" /> */}


      {/* <View style = {styles.backButton}>
        <BackButton screenName="Profile" />
      </View> */}
    </Appbar.Header>
  );
};

export default AccountScreenHeader;