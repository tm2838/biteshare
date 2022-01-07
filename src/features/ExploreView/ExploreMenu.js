import React, { useContext, useState, useEffect } from 'react';
import { Appbar, Button } from 'react-native-paper';
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';
import { colors } from '../../infrastructure/colors';
import { fonts } from '../../infrastructure/fonts';
import { BiteShareContext } from '../../BiteShareContext';
import { addANewAnonymousDocument, getADocReferenceFromCollection, updateADocument } from '../../../firebase/helpers/database.firebase';
import { Timestamp } from 'firebase/firestore';
import Loading from '../../components/Loading.js';

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
    paddingTop: 10,
    height: 520,
    marginHorizontal: 20,
  },
  itemContainer: {
    paddingBottom: 10
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 70
  },
  text: {
    fontSize: 25,
    fontFamily: fonts.subHeading,
    textAlign: 'center',
  },
  one: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.body,
  },
  description: {
    fontSize: 13,
    fontFamily: fonts.light,
  }
});

const Item = ({ name, description, price }) => (

  <View style={styles.itemContainer}>
    <View style={styles.one}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.name}> ${price}</Text>
    </View>
    <Text style={styles.description}>{description}</Text>

  </View>
);

const ExploreMenu = ({ navigation }) => {
  const { state: { restaurantName, restaurantId, restaurantMenus, biteShareKey, accountHolderName, accountType, nickname, sessionId, email, userId }, dispatch } = useContext(BiteShareContext);
  const API_KEY = biteShareKey;
  const [isLoading, setLoading] = useState(true);
  const [restaurantAddress, setRestaurantAddress] = useState('');
  const [creatingSession, setCreatingSession] = useState(false);

  const renderMenus = ({item}) => {
    return (<Item name={item.name} description={item.description} price={item.price} />);
  };

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
          userId: userId,
        })
          .then(() => {
            console.log('Successfully added the host into the database');
          })
          .catch((error) => {
            console.log('Error when adding host into the database');
          })
          .then(() => {
            // navigate the HOST to QR code screen - allows guest to scan
            dispatch({ type: 'SET_JOIN_REQUEST', joinRequest: 'allowed' });
            navigation.navigate('CurrentSession', { previous: 'create a session' });
            setCreatingSession(false);
          })
          .then(() => {
            addANewAnonymousDocument(`users/${userId}/transactions`, {
              sessionId: doc.id,
              isCurrent: true,
              individualBills: 0,
              date: Timestamp.fromDate(new Date()),
              role: 'Host',
            })
              .then(() => {
                console.log('Successfully added the transaction for current user');
              })
              .catch((error) => {
                console.log('Error adding the transaction for current user');
              });
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
          ? <Loading primaryMessage='Loading...' />
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
              <Text style={styles.text}> Menu </Text>
              <View style={styles.scrollView}>
                <FlatList
                  data= {restaurantMenus}
                  renderItem={renderMenus}
                  keyExtractor={item => item.key}
                />
              </View>

              <View style={styles.menuContainer}>
                {/* onPress 'create a session', it will direct to the QR code -  */}
                {/* once accountType is assigned, the button type will not be shown */}
                {
                  (accountType === '' || accountType === 'HOST') && sessionId === '' &&
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

