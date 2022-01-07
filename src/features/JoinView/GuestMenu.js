import React, { useContext, useState, useEffect } from 'react';
import { Appbar, List, Button, Avatar } from 'react-native-paper';
import { useNavigation} from '@react-navigation/native';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, StatusBar, ActivityIndicator } from 'react-native';
import { colors } from '../../infrastructure/colors';
import { fonts } from '../../infrastructure/fonts';
import { BiteShareContext } from '../../BiteShareContext';
import { readASingleDocument } from '../../../firebase/helpers/database.firebase.js';
import Loading from '../../components/Loading.js';

const styles = StyleSheet.create({
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
  },
  restaurantHeader: {
    backgroundColor: colors.brand.login,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  scrollView: {
    height: 500,
    marginHorizontal: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 70
  },
  text: {
    fontSize: 20,
    fontFamily: fonts.subHeading,
    textAlign: 'center',
  },
});

const GuestMenu = () => {

  const { state: { restaurantName, restaurantId, restaurantMenus, biteShareKey, sessionId }, dispatch } = useContext(BiteShareContext);
  const API_KEY = biteShareKey;

  const [isLoading, setLoading] = useState(true);
  const [restaurantAddress, setRestaurantAddress] = useState('');

  useEffect(() => {
    readASingleDocument('transactions', sessionId)
      .then((doc) => {
        dispatch({ type: 'SET_RESTAURANT_MENU', restaurantMenus: doc.data().menu });
      })
      .catch(err => console.log('Error getting menu'));
  }, []);

  return (
    <View >

      <View >

        <Appbar.Header style={styles.restaurantHeader} >
          <Appbar.Content title={restaurantName} subtitle={restaurantAddress} style={styles.restaurantHeading} />
        </Appbar.Header>
        <ScrollView style={styles.scrollView}>

          <List.Subheader>
            <Text style={styles.text}>Menu</Text>
          </List.Subheader>
          {restaurantMenus.map((one) => {
            return (<List.Item
              key={one.key}
              title={one.name}
              description={one.description}
              right={() => (<Text> $ {one.price}</Text>)}
            />);
          })}

        </ScrollView>

        <Loading primaryMessage='Still waiting for host to connect' secondaryMessage='Feel free to look at the menu while waiting'/>

      </View>

    </View>
  );
};

export default GuestMenu;

