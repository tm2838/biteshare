import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { Checkbox, Card } from 'react-native-paper';
import { colors } from '../../../infrastructure/colors.js';
import { fonts } from '../../../infrastructure/fonts.js';
import { BiteShareContext } from '../../../BiteShareContext.js';

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
  const { state: { accountHolderName, orderedItems, accountHolderReady }, dispatch } = useContext(BiteShareContext);
  const choice = { id: menu.key, name: menu.name, description: menu.description, price: menu.price };
  const itemOrdered = orderedItems.filter(item => item.id === choice.id).length > 0;
  const [checked, setChecked] = useState(itemOrdered);

  const selectMenu = () => {
    setChecked(!checked);

    if (!checked) {
      dispatch({ type: 'SET_ORDERED_ITEMS', orderedItems: [...orderedItems, choice]});
    } else {
      //if user uncheck the item, remove from the selectedMenu
      const updatedOrderedList = orderedItems.filter(each => each.id !== menu.key);
      dispatch({ type: 'SET_ORDERED_ITEMS', orderedItems: updatedOrderedList });
    }

  };

  useEffect(() => {
    if (!accountHolderReady) {
      dispatch({ type: 'SET_ORDERED_ITEMS', orderedItems: []});
      setChecked(false);
    }
  }, [accountHolderReady]);

  return (
    <View style={styles.container} >

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
        onPress={selectMenu}
      >

        <View style={{width: '10%'}}>
          {/* Checkbox.Android showed the square box, if <checkbox /> used, it will not show box */}
          <Checkbox.Android
            status={checked ? 'checked' : 'unchecked'}
            color={'black'}
          />

        </View>

        <View style={{ width: '75%'}}>
          <Text style={styles.title}>{menu.name}</Text>
          <Text style={styles.description}>{menu.description}</Text>
        </View>

        <View style={{width: '15%'}}>
          <Text>${menu.price}</Text>
        </View>
      </Pressable>

    </View>
  );
};

export default Menu;