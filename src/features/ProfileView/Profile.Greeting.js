import React, { useContext } from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { colors } from '../../infrastructure/colors';
import { StyleSheet, Text, View, Image } from 'react-native';
import { BiteShareContext } from '../../BiteShareContext';

const styles = StyleSheet.create({
  profileView: {
    flex: .25,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',

    borderColor: 'black',
    borderWidth: 1
  },
  profileAvatar: {
    marginRight: 15
  },
  profileName: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
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
      </View>

      <Text style={styles.profileName}>Hi, I'm {accountHolderName}</Text>

    </View>
  );
};

export default ProfileGreeting;