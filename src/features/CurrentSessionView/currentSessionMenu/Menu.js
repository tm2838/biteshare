import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Checkbox } from 'react-native-paper';
import { colors } from '../../../infrastructure/colors.js';
import { fonts } from '../../../infrastructure/fonts.js';
import BiteshareButton from '../../../components/BiteshareButton.js';
import { BiteShareContext } from '../../../BiteShareContext.js';
// import MenuItemCard from '../../../components/MenuItemCard.js';

//NOTE - checkbox (for selection) is not used since it only support Android and Web

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  menuContainer: {
    height: 65,
    margin: 5,
    padding: 10,
    backgroundColor: colors.brand.kazanLight2,
    flexDirection: 'row',
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
  // console.log('Menu------------------>', menu);

  const { state: { accountHolderName, accountType, guests }, dispatch } = useContext(BiteShareContext);
  const [checked, setChecked] = React.useState(false);
  const selectMenu = () => {
    setChecked(!checked);
  };

  return (
    <View style={styles.container} >

      <Pressable style={styles.menuContainer} onPress={selectMenu}>
        <View style={{width: '10%'}}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            color={'black'}
            onPress={selectMenu}
          />


        </View>

        <View style={{ width: '80%'}}>
          <Text style={styles.title}>{menu.item.name}</Text>
          <Text style={styles.description}>{menu.item.description}</Text>
        </View>

        <View style={{width: '10%'}}>
          <Text>$ {menu.item.price}</Text>
        </View>
      </Pressable>

    </View>
  );
};

export default Menu;