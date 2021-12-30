import React, { useContext, useState, useEffect} from 'react';
import { Appbar, List, Button, Avatar} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, StatusBar} from 'react-native';
import { colors } from '../../infrastructure/colors';
import { fonts } from '../../infrastructure/fonts';
import { BiteShareContext } from '../../BiteShareContext';
// import { useNavigation } from '@react-navigation/native';
// import mockMenu from '../../../fixtures/mockMenu.json';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import ExploreScreen from './Explore.Screen';


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
    borderRadius: 20,
    width: 30
  },
  text: {
    fontSize: 20,
    fontFamily: fonts.subHeading
  },
});

const ExploreMenu = ({navigation}) => {
  // console.log('Navigation-------------MENU------------', navigation);
  //l-44-51 suppose to work on the ogic of going back to the Explore page. Currently it is not working
  // const navigation = useNavigation();
  const route = useRoute();

  // console.log('route--', route);
  // console.log(navigation);
  // let previousScreen = route.name === 'Join' ? 'Explore' : 'Explore';
  const handleBackButton = () => {
    // console.log(navigation);
    // navigation.navigate('Join', {previous: 'coming from back button'});
    navigation.jumpTo('Explore');
  };

  const API_KEY = 'E3EE4E5EE5EEEEEE5E522EEEE5EE0157f194895a9ab68497ab203e9092656EEEE4556678EEEEEEEEEEEEE';
  const {state: { restaurantName, restaurantId, restaurantMenus}, dispatch } = useContext(BiteShareContext);
  const [isLoading, setLoading] = useState(true);
  const [restaurantAddress, setRestaurantAddress] = useState('');


  const parseJsonMenu = (data) => {
    let prettyMenu = [];
    let menuId = 1;
    for ( let i = 0; i < data.length; i++) {
      let section = data[i].menu_items;
      for (let j = 0; j < section.length; j++) {
        let item = section[j];
        prettyMenu.push({key: menuId, name: item.name, description: item.description, price: item.price});
        menuId ++; //to remove the warning from react console - providing KEY for each component
      }
    }

    dispatch({ type: 'SET_RESTAURANT_MENU', restaurantMenus: prettyMenu });
  };

  useEffect(()=>{
    fetch(`https://api.documenu.com/v2/restaurant/${restaurantId}?key=${API_KEY}`)
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
              {/* <BackButton screenName='Explore' /> */}
              <Appbar.Header style = {styles.restaurantHeader} >
                <Appbar.BackAction onPress={handleBackButton} color="black" />
                <Appbar.Content title={restaurantName} subtitle={restaurantAddress} style = {styles.restaurantHeading}/>
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
                    right={()=>(<Text> $ {one.price}</Text>)}
                  />);
                })}

              </ScrollView>
              {/* onPress 'create a session', it will direct to the QR code -  */}
              <View>
                <Button
                  icon='account-plus'
                  mode="contained"
                  color={colors.brand.beachLight}
                  onPress={() => navigation.navigate('CurrentSession', {previous: 'create a session'})}>
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

