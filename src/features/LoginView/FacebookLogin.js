import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import facebookLogo from '../../../assets/facebook-logo.png';
import { useNavigation } from '@react-navigation/native';
import { fbLogin } from '../../../firebase/helpers/authentication.firebase';
import { BiteShareContext } from '../../BiteShareContext';
import { getADocReferenceFromCollection, addANewAnonymousDocument } from '../../../firebase/helpers/database.firebase';

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
        dispatch({ type: 'SET_ACCOUNT_HOLDER_NAME', accountHolderName: fbUserName });
        // add this user into the users collection if not exists
        try {
          const userDocs = await getADocReferenceFromCollection('users', 'email', '==', fbLogInResult.email);
          if (userDocs.size === 0) {
            // create a new document in users collection for this user
            await addANewAnonymousDocument('users', {
              name: fbLogInResult.name,
              email: fbLogInResult.email,
            });

          } else {
            await userDocs.forEach((doc) => dispatch({ type: 'SET_USER_ID', userId: doc.id }));
          }
        } catch (error) {
          console.log('Unable to create/find the user in users collection', error);
        }

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