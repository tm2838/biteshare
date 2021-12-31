import React, { useContext, useState, useEffect} from 'react';
import { ActivityIndicator, StyleSheet, View, Text, SafeAreaView, FlatList} from 'react-native';
import { colors } from '../../../infrastructure/colors';
import { fonts } from '../../../infrastructure/fonts';
import { BiteShareContext } from '../../../BiteShareContext';
// import mockParseMenu from '../../../../fixtures/mockParseMenu.json';
import Menu from './Menu';

const styles = StyleSheet.create({

  container: {

    height: '75%',
    margin: 5

  },

});

const SessionMenu = () => {

  const {state: { restaurantName, restaurantId, restaurantMenus}, dispatch } = useContext(BiteShareContext);
  // console.log('-------restaurantMenus--------', restaurantMenus);

  // **** useEffect is used for the mockData, if real data is used, it will be updated from contextAPI (restaurantMenus)

  // useEffect(() => {
  //   dispatch({ type: 'SET_RESTAURANT_MENU', restaurantMenus: mockParseMenu });
  // }, [mockParseMenu]);

  const renderMenus = (menu) => {
    return (<Menu menu={menu} key = {menu.id}/>);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <ActivityIndicator size="small" color={colors.brand.darkBlue} /> */}

      <FlatList
        data={restaurantMenus}
        renderItem={renderMenus}
        keyExtractor={menu => menu.id}
      />

    </SafeAreaView>
  );

};

export default SessionMenu;