import React, { useContext } from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { colors } from '../../../infrastructure/colors';
import { StyleSheet, Text, View, TouchableOpacity, Pressable} from 'react-native';
import { BiteShareContext } from '../../../BiteShareContext';
import { theme } from '../../../infrastructure/index';


import BigButton from '../../../components/BigButton';


const styles = StyleSheet.create({
  view: {
    flex: .25,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  photo: {
    marginRight: 15
  },
  button: {
    backgroundColor: theme.colors.brand.beach,
    borderRadius: 4,
    width: '65%',
    height: 50,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20
  }
});

const UserPhoto = () => {
  const { dispatch } = useContext(BiteShareContext);

  const profilePicturePath = '../../../../assets/profilePicture.png';

  return (
    <View style={styles.view}>
      <View style = {styles.photo}>
        <Avatar.Image
          source = {require(profilePicturePath)}
          size = {80}
        />
      </View>


      <TouchableOpacity
        style={styles.button}
        // onPress={updatePhoto}
      >
        <Text style={styles.text}>Update Profile Photo</Text>
      </TouchableOpacity>


      {/* <Text style={styles.profileName}>Update Profile Photo</Text> */}
      {/* <BigButton title={'Update Profile Photo'}></BigButton> */}

    </View>
  );
};

export default UserPhoto;