import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import facebookLogo from '../../../assets/facebook-logo.png';
import { useNavigation } from '@react-navigation/native';
import { fbLogin } from '../../../firebase/helpers/authentication.firebase';
import { BiteShareContext } from '../../BiteShareContext';

const styles = StyleSheet.create({
  fbLogo: {
    marginTop: 4,
    height: 62,
    width: 62,
  }
});

const FacebookLogin = () => {
  const navigation = useNavigation();
  const { dispatch } = useContext(BiteShareContext);
  const handleFbLogin = async () => {
    try {
      const fbLogInResult = await fbLogin();
      const fbUserName = fbLogInResult.name;
      if (fbLogInResult !== 'cancelled') {
        dispatch({ type: 'SET_AUTH', authenticated: true });
        dispatch({ type: 'SET_NICKNAME', nickname: fbUserName.split(' ')[0] });
        navigation.navigate('Home');
      }
    } catch (error) {
      alert('Can not login using Facebook now. Please try later');
    }

  };

  return (
    <View>
      <TouchableOpacity onPress={handleFbLogin}>
        <Image style={styles.fbLogo} source={facebookLogo} />
      </TouchableOpacity>
    </View>
  );
};

export default FacebookLogin;