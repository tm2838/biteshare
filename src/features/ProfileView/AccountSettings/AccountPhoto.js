import React from 'react';
import { Avatar } from 'react-native-paper';
import { colors } from '../../../infrastructure/colors';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { BiteShareContext } from '../../../BiteShareContext';
import { theme } from '../../../infrastructure/index';


import BigButton from '../../../components/BigButton';

const styles = StyleSheet.create({
  container: {
    flex: .6,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'black'
  },
  photo: {
    marginRight: 15
  },
  button: {
    backgroundColor: theme.colors.brand.beach,

    width: '65%',
    height: 50,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,

  }
});

const UserPhoto = () => {
  const profilePicturePath = '../../../../assets/profilePicture.png';

  //TODO
  //ADD FUNCTION TO UPDATE PROFILE PHOTO IN USERS COLLECTION
  //WILL NEED TO ACCESS DEVICES FILE SYSTEM TO SELECT PHOTO

  return (
    <View style={styles.container}>
      <View style = {styles.photo}>
        <Avatar.Image
          source = {require(profilePicturePath)}
          size = {80}
          style = {{backgroundColor: '#f2f2f2'}}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        // onPress={updatePhoto}
      >
        <Text style={styles.text}>Update Profile Photo</Text>
      </TouchableOpacity>

    </View>
  );
};

export default UserPhoto;