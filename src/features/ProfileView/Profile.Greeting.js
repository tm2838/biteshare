import React, { useContext } from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { colors } from '../../infrastructure/colors';
import { StyleSheet, Text, View, Image } from 'react-native';
import { BiteShareContext } from '../../BiteShareContext';

const styles = StyleSheet.create({
  profileView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    marginRight: 15
  },
  profileName: {
    color: 'black'
  },
});

const ProfileGreeting = () => {
  const { state: { accountHolderName }, dispatch } = useContext(BiteShareContext);

  const profilePicturePath = '../../../assets/profilePicture.png';

  return (
    <View style={styles.profileView}>
      <View style = {styles.profileAvatar}>
        <Avatar.Image
          source = {require(profilePicturePath)}
          size = {80}
        />
        <Text style={styles.profileName}>Hi, I'm {accountHolderName}</Text>
      </View>

    </View>
  );
};

export default ProfileGreeting;