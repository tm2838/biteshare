import React from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { colors } from '../../infrastructure/colors';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  header: {
    backgroundColor: colors.brand.kazan,
  },
  headerAvatar: {
    flex: 1,
  },
  backbuttonView: {
    width: '70%'
  },
  profileView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    marginRight: 15
  },
  profileName: {
    color: 'white'
  },
  profileLogo: {
    paddingBottom: 10
  },

});

const JoinScreenHeader = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const profilePicturePath = '../../../assets/profilePicture.png';
  const profileLogoPath = '../../../assets/profile-logo.png';
  let previousScreen = route.name === 'Join' ? 'Explore' : '';
  const handleBackButton = () => navigation.navigate(previousScreen);
  return (
    <Appbar.Header style={styles.header}>
      <View style={styles.headerContainer}>
        <View style={styles.backbuttonView}>
          <Appbar.BackAction onPress={handleBackButton} color="white" />
        </View>
        <View style={styles.profileView}>
          <View style = {styles.profileAvatar}>
            <Avatar.Image
              source = {require(profilePicturePath)}
              size = {40}
            />
            <Text style={styles.profileName}>Susan</Text>
          </View>
          <View style={styles.profileLogo}>
            <Image
              source = {require(profileLogoPath)}
            />
          </View>
        </View>
      </View>
    </Appbar.Header>
  );
};

export default JoinScreenHeader;