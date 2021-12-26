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

    backgroundColor: colors.brand.body,
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
  const {state: { restaurantName}, dispatch } = useContext(BiteShareContext);

  const [isLoading, setLoading] = useState(true);
  const [restaurantAddress, setRestaurantAddress] = useState('');
  const [menus, setMenus] = useState([]);
  console.log('one menu item----------->', menus.length);

  useEffect(()=>{
    fetch('https://api.documenu.com/v2/restaurant/4072702673999819?key=89b0a4b3df7196e6b1f8f3e2e63c9013')
      .then((response) => response.json())
      .then((json) => {
        // console.log('result**************************************', json.result.menus );
        setRestaurantAddress(json.result.address.formatted);
        setMenus(json.result.menus[0].menu_sections);
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
                  <Text style={styles.text}>Top Picked for you</Text>
                </List.Subheader>
                <List.Item
                  title="Mini Coxinhas"
                  description="Brazilian pastry made with chicken served with garlic aioli"
                  right={()=>(<Text> $ 13.95</Text>)}
                />

                <List.Item
                  title="Carne De Sol Acebolada"
                  description="Sun dried meat served with grilled marinated onions, fried yuca or boiled yucca, and special brazilian butter."
                  right={()=>(<Text> $ 20.95</Text>)}
                />
                <List.Item
                  title="Espetinho De Picanha"
                  description="Brazilian tender cut “Coulotte” served with Brazilian vinaigrette sauce and two side of your choice"
                  right={()=>(<Text> $ 17.95</Text>)}
                />
                <List.Item
                  title="Bolinho De Bacalhau"
                  description="Portugal cod fish croquettes served with garlic aioli."
                  right={()=>(<Text> $ 16.95</Text>)}
                />
                <List.Item
                  title="Risoto Camarão Internacional"
                  description="International shrimp served with risotto, green pea, chopped ham, heavy cream cheese sauce, Parmesan cheese (choice chicken breast cube)."
                  right={()=>(<Text> $ 24.95</Text>)}
                />
                <List.Item
                  title="Testing for scrollable"
                  description="Item description"
                  right={()=>(<Text> $ 13.95</Text>)}
                />
                <List.Item
                  title="Testing for scrollable"
                  description="Item description"
                  right={()=>(<Text> $ 13.95</Text>)}
                />
                <List.Item
                  title="Testing for scrollable"
                  description="Item description"
                  right={()=>(<Text> $ 13.95</Text>)}
                />
                <List.Item
                  title="Testing for scrollable"
                  description="Item description"
                  right={()=>(<Text> $ 13.95</Text>)}
                />
                <List.Item
                  title="Testing for scrollable"
                  description="Item description"
                  right={()=>(<Text> $ 13.95</Text>)}
                />
              </ScrollView>

              <View>
                <Button icon='account-plus' mode="contained" color={colors.brand.login} onPress={() => console.log('Pressed')}>
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

{ /*
 {/* <View style = {styles.container}> */ }
{ /* <ScrollView style={styles.scrollView}> */ }
// {menus.map(each=> {
//   console.log('Session Name------>', each.section_name);
//   <View >
//     {/* <List.Subheader>
//       <Text>each.section_name</Text>
//     </List.Subheader> */}
//     <List.Item
//       title="First Item"
//       description="Item description"
//       right={()=>(<Text> $ 13.95</Text>)}
//     />
//   </View>;

// })}
// {/* <List.Subheader>
//   <Text>Appetizer</Text>
// </List.Subheader> */}

// </ScrollView>

{ /* </View> */ }




// const { state: { accountType, isEveryoneReady } } = useContext(BiteShareContext);
// const buttonStyle = isEveryoneReadvy ? { backgroundColor: colors.brand.beachLight, marginTop: 50, width: 180 } : { marginTop: 50, width: 180 };
// const title = isEveryoneReady ? 'Eeryone is ready!' : 'Still waiting...';
// return (
//   <View style={styles.container}>
//     <Text style={styles.title}>Summary</Text>
//     <GuestList />
//     {accountType === 'HOST' && <BiteshareButton size={100} title={title} buttonStyle={buttonStyle} disabled/>}
//     {accountType === 'HOST' && <SplitBillOptions />}
//   </View>
// ); */ }