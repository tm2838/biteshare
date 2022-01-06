import React, { useContext, useState, useEffect } from 'react';
import { Appbar, List, Button, Avatar } from 'react-native-paper';
import { useNavigation} from '@react-navigation/native';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, StatusBar, ActivityIndicator } from 'react-native';
import { colors } from '../../infrastructure/colors';
import { fonts } from '../../infrastructure/fonts';
import { BiteShareContext } from '../../BiteShareContext';
// import Icon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
  },
  buttomContainer: {
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

  const { state: { restaurantName, restaurantId, restaurantMenus, biteShareKey }, dispatch } = useContext(BiteShareContext);
  const API_KEY = biteShareKey;

  const [isLoading, setLoading] = useState(true);
  const [restaurantAddress, setRestaurantAddress] = useState('');

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

        <View style={styles.buttomContainer}>

          < ActivityIndicator size="small" color="darkblue"/>
          <Text style={styles.text}> Still waiting for host to connect</Text>
          <Text> Feel free to look at menu while waiting </Text>

        </View>

      </View>



    </View>
  );
};

export default GuestMenu;

