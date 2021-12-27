import React, { useContext, useState, useEffect} from 'react';
import { Appbar, List, Button} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, StatusBar} from 'react-native';
import { colors } from '../../../infrastructure/colors';
import { fonts } from '../../../infrastructure/fonts';
import { BiteShareContext } from '../../../BiteShareContext';
import Icon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  container: {
   
    backgroundColor: colors.brand.body,
  },
  scrollView: {

    // backgroundColor: colors.brand.body,
    height: '75%',
    marginHorizontal: 20,
    width: '100%'

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

const SessionMenu = () => {
  // const navigation = useNavigation();
  const {state: { restaurantName, restaurantId, restaurantMenus}, dispatch } = useContext(BiteShareContext);


  // const parseJsonMenu = (data) => {
  //   let prettyMenu = [];
  //   let menuId = 1;
  //   for ( let i = 0; i < data.length; i++) {
  //     let section = data[i].menu_items;
  //     for (let j = 0; j < section.length; j++) {
  //       let item = section[j];
  //       prettyMenu.push({key: menuId, name: item.name, description: item.description, price: item.price});
  //       menuId ++; //to remove the warning sign of providing KEY for each component
  //     }
  //   }

  //   dispatch({ type: 'SET_RESTAURANT_MENU', restaurantMenus: prettyMenu });
  // };

  // useEffect(()=>{
  //   fetch(`https://api.documenu.com/v2/restaurant/${restaurantId}?key=${API_KEY}`)
  //     .then((response) => response.json())
  //     .then((json) => {

  //       setRestaurantAddress(json.result.address.formatted);
  //       parseJsonMenu(json.result.menus[0].menu_sections);

  //     })
  //     .catch((error => console.error(error)))
  //     .finally(()=>setLoading(false));
  // }, []);

  return (


    <View >


      <ScrollView style={styles.scrollView}>

        {restaurantMenus.map((one) => {
          return (<List.Item
            key={one.key}
            title={one.name}
            description={one.description}
            right={()=>(<Text> $ {one.price}</Text>)}
          />);
        })}



      </ScrollView>

    </View>

  );



};

export default SessionMenu;