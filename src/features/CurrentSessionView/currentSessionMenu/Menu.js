import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Checkbox, Card } from 'react-native-paper';
import { colors } from '../../../infrastructure/colors.js';
import { fonts } from '../../../infrastructure/fonts.js';
import BiteshareButton from '../../../components/BiteshareButton.js';
import { BiteShareContext } from '../../../BiteShareContext.js';
// import MenuItemCard from '../../../components/MenuItemCard.js';

//NOTE - use Checkbox.Android to show the squarebox - it works on iphone12...

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  title: {
    fontFamily: fonts.subHeading
  },
  description: {
    fontFamily: fonts.light,
    fontSize: 12
  }
});

const Menu = ({ menu }) => {
  // console.log('Menu-------Session----------->', menu);

  const { state: { accountHolderName, orderedItems }, dispatch } = useContext(BiteShareContext);
  const [checked, setChecked] = useState(false);
  // console.log('------------------orderedItems------>', orderedItems.name, orderedItems.length);

  const selectMenu = (item) => {

    setChecked(!checked);

    let choice = {id: item.key, name: item.name, description: item.description };
    if (!checked) {
      dispatch({ type: 'SET_ORDERED_ITEMS', orderedItems: [...orderedItems, choice]});
    } else {
      //if user uncheck the item, remove from the selectedMenu
      const updatedOrderedList = orderedItems.filter(each => each.id !== item.key);
      dispatch({ type: 'SET_ORDERED_ITEMS', orderedItems: updatedOrderedList });
    }


  };

  return (
    <View style={styles.container} key = {menu.id} >

      <Pressable
        style={({ pressed }) => [
          styles.button,
          {
            opacity: pressed ? 0.5 : 1,
            margin: 5,
            padding: 10,
            borderRadius: 10,
            backgroundColor: pressed ? colors.brand.kazan : colors.brand.kazanLight2,
            flexDirection: 'row',
          },
        ]}
        key = {menu.id}
        onPress={()=> { selectMenu(menu.item); }}
      >


        <View style={{width: '10%'}}>
          {/* Checkbox.Android showed the square box, if <checkbox /> used, it will not show box */}
          <Checkbox.Android
            status={checked ? 'checked' : 'unchecked'}
            color={'black'}
            onPress={()=> { selectMenu(menu.item); }}
          />


        </View>

        <View style={{ width: '75%'}}>
          <Text style={styles.title}>{menu.item.name}</Text>
          <Text style={styles.description}>{menu.item.description}</Text>
        </View>

        <View style={{width: '15%'}}>
          <Text>$ {menu.item.price}</Text>
        </View>
      </Pressable>

    </View>
  );
};

export default Menu;