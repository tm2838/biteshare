import React, { useContext, useState, useEffect} from 'react';
import { Appbar, List, Button} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, StatusBar} from 'react-native';
import { colors } from '../../infrastructure/colors';
import { fonts } from '../../infrastructure/fonts';
import { BiteShareContext } from '../../BiteShareContext';
import mockMenu from '../../../fixtures/mockMenu.json';
import Icon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: colors.brand.body,
  },
  scrollView: {

    // backgroundColor: colors.brand.body,
    height: '76%',
    marginHorizontal: 20,

  },
  restaurantHeader: {
    backgroundColor: colors.brand.login,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontFamily: fonts.subHeading
  },


});

const ExploreMenu = () => {
  const navigation = useNavigation();

  const {state: { restaurantName, restaurantId}, dispatch } = useContext(BiteShareContext);

  const [isLoading, setLoading] = useState(true);
  const [restaurantAddress, setRestaurantAddress] = useState('');
  const [menus, setMenus] = useState([]);


  const parseJsonMenu = (data) => {
    let prettyMenu = [];

    for ( let i = 0; i < data.length; i++) {
      let section = data[i].menu_items;
      for (let j = 0; j < section.length; j++) {
        let item = section[j];
        prettyMenu.push({name: item.name, description: item.description, price: item.price});
      }
    }
    setMenus(prettyMenu);
  };

  useEffect(()=>{
    fetch(`https://api.documenu.com/v2/restaurant/${restaurantId}?key=89b0a4b3df7196e6b1f8f3e2e63c9013`)
      .then((response) => response.json())
      .then((json) => {

        setRestaurantAddress(json.result.address.formatted);
        parseJsonMenu(json.result.menus[0].menu_sections);

      })
      .catch((error => console.error(error)))
      .finally(()=>setLoading(false));
  }, []);

  return (
    <View >
      {
        isLoading
          ? <Text>Loading...</Text>
          : (
            <View >
              <Appbar.Header style = {styles.restaurantHeader} >
                <Appbar.Content title={restaurantName} subtitle={restaurantAddress} style = {styles.restaurantHeading}/>
              </Appbar.Header>

              <ScrollView style={styles.scrollView}>
                <List.Subheader>
                  <Text style={styles.text}>Menus</Text>
                </List.Subheader>
                {menus.map((one) => {
                  return (<List.Item
                    title={one.name}
                    description={one.description}
                    right={()=>(<Text> $ {one.price}</Text>)}
                  />);
                })}



              </ScrollView>
              {/* onPress 'create a session', it will direct to the QR code -  */}
              <View>
                <Button icon='account-plus' mode="contained" color={colors.brand.login} onPress={() => navigation.navigate('CurrentSession', {previous: 'create a session'})}>
            Create a Session
                </Button>
              </View>
            </View>

          )
      }
    </View>
  );
};

export default ExploreMenu;

