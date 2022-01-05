import React, { useContext, useState, useEffect } from 'react';
import { Appbar, List, Button, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { colors } from '../../infrastructure/colors';
import { fonts } from '../../infrastructure/fonts';
import { BiteShareContext } from '../../BiteShareContext';
// import { useNavigation } from '@react-navigation/native';
// import mockMenu from '../../../fixtures/mockMenu.json';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { addANewAnonymousDocument } from '../../../firebase/helpers/database.firebase';
import { Timestamp } from 'firebase/firestore';


const styles = StyleSheet.create({
  menuContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  restaurantHeader: {

    backgroundColor: colors.brand.login,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },

  scrollView: {

    height: 535,
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

const ExploreMenu = ({ navigation }) => {
  // console.log('--------navigation from explore Menu----', navigation);
  const { state: { restaurantName, restaurantId, restaurantMenus, biteShareKey, accountHolderName, accountType, nickname }, dispatch } = useContext(BiteShareContext);
  const API_KEY = biteShareKey;
  const [isLoading, setLoading] = useState(true);
  const [restaurantAddress, setRestaurantAddress] = useState('');
  const [creatingSession, setCreatingSession] = useState(false);

  const parseJsonMenu = (data) => {
    let prettyMenu = [];
    let menuId = 1;
    for (let i = 0; i < data.length; i++) {
      let section = data[i].menu_items;
      for (let j = 0; j < section.length; j++) {
        let item = section[j];
        prettyMenu.push({ key: menuId, name: item.name, description: item.description, price: item.price });
        menuId++; //to remove the warning from react console - providing KEY for each component
      }
    }

    dispatch({ type: 'SET_RESTAURANT_MENU', restaurantMenus: prettyMenu });
  };

  useEffect(() => {
    fetch(`https://api.documenu.com/v2/restaurant/${restaurantId}?key=${API_KEY}`)
      .then((response) => response.json())
      .then((json) => {

        setRestaurantAddress(json.result.address.formatted);
        parseJsonMenu(json.result.menus[0].menu_sections);

      })
      .catch((error => console.error(error)))
      .finally(() => setLoading(false));
  }, []);

  const createSessionHandler = () => {
    //Once user click 'create Session', the AccountType change to 'HOST'
    setCreatingSession(true);
    dispatch({ type: 'SET_ACCOUNT_TYPE', accountType: 'HOST' });

    addANewAnonymousDocument('transactions', {
      hostName: nickname || accountHolderName,
      restaurantName: restaurantName,
      splitMethod: '',
      totalBills: 0,
      date: Timestamp.fromDate(new Date()),
      menu: restaurantMenus,
    })
      .then((doc) => {
        dispatch({ type: 'SET_ACCOUNT_TYPE', accountType: 'HOST' });
        dispatch({ type: 'SET_SESSION_ID', sessionId: doc.id });
        addANewAnonymousDocument(`transactions/${doc.id}/attendees`, {
          joinRequest: 'allowed',
          isHost: true,
          individualBills: 0,
          name: nickname || accountHolderName,
          orderStatus: 'not ready',
          orderedItems: [],
        })
          .then((doc) => {
            console.log('Successfully added the host into the database');
          })
          .catch((error) => {
            console.log('Error when adding host into the database');
          })
          .then(() => {
            // navigate the HOST to QR code screen - allows guest to scan
            navigation.navigate('CurrentSession', { previous: 'create a session' });
            setCreatingSession(false);
          });
      })
      .catch((error) => {
        console.log('Error creating a new transaction');
      });
  };

  return (
    <View >
      {
        isLoading
          ? <Text>Loading...</Text>
          : (
            <View >

              <Appbar.Header style={styles.restaurantHeader} >

                < Appbar.BackAction
                  onPress={
                    () => {
                      dispatch({ type: 'SET_RESTAURANT_ID', restaurantId: null });
                    }
                  }
                  color="black"
                />
                <Appbar.Content title={restaurantName} subtitle={restaurantAddress} style={styles.restaurantHeading} />
              </Appbar.Header>
              {/* implentation with FLATLIST */}
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

              <View style={styles.menuContainer}>
                {/* onPress 'create a session', it will direct to the QR code -  */}
                {/* ????? - is HOST allow to create a new session (NO) */}
                {
                  accountType !== 'GUEST' &&
                  <Button
                    icon='account-plus'
                    mode="contained"
                    color={colors.brand.beachLight}
                    style={{ width: 250, borderRadius: 15, height: 38 }}
                    onPress={() => createSessionHandler()}>
                    {creatingSession ? 'Creating session...' : 'Create a Session'}
                  </Button>}

              </View>
            </View>
          )
      }
    </View>
  );
};

export default ExploreMenu;

