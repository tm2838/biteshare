import React, { useContext, useState, useEffect} from 'react';
import { Appbar, List, Button} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
// import { useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, StatusBar} from 'react-native';
import { colors } from '../../infrastructure/colors';
import { fonts } from '../../infrastructure/fonts';
import { BiteShareContext } from '../../BiteShareContext';
// import mockMenu from '../../../fixtures/mockMenu.json';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BackButton from '../../components/BackButton';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: colors.brand.body,
  },
  scrollView: {
    // backgroundColor: colors.brand.body,
    height: '75%',
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
  const API_KEY = '157f194895a9ab68497ab203e9092656';
  const {state: { restaurantName, restaurantId, restaurantMenus}, dispatch } = useContext(BiteShareContext);
  // console.log('MENU---------------------->', restaurantMenus);
  const [isLoading, setLoading] = useState(true);
  const [restaurantAddress, setRestaurantAddress] = useState('');
  // const [menus, setMenus] = useState([]);
  // console.log(menus);

  const parseJsonMenu = (data) => {
    let prettyMenu = [];
    let menuId = 1;
    for ( let i = 0; i < data.length; i++) {
      let section = data[i].menu_items;
      for (let j = 0; j < section.length; j++) {
        let item = section[j];
        prettyMenu.push({key: menuId, name: item.name, description: item.description, price: item.price});
        menuId ++; //to remove the warning sign of providing KEY for each component
      }
    }
    // setMenus(prettyMenu);
    dispatch({ type: 'SET_RESTAURANT_MENU', restaurantMenus: prettyMenu });
  };

  useEffect(()=>{
    fetch(`https://api.documenu.com/v2/restaurant/${restaurantId}?key=${API_KEY}`)
      .then((response) => response.json())
      .then((json) => {
        // console.log('json Data-->', json);
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
                <Appbar.Content title={restaurantName} subtitle={restaurantAddress} style = {styles.restaurantHeading}/>
              </Appbar.Header>

              <ScrollView style={styles.scrollView}>
                <List.Subheader>
                  <Text style={styles.text}>Menus</Text>
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
                <Button icon='account-plus' mode="contained" color={colors.brand.beachLight} onPress={() => navigation.navigate('CurrentSession', {previous: 'create a session'})}>
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

