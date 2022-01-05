import React, { useContext, useState, useEffect} from 'react';
import { StyleSheet, SafeAreaView, FlatList} from 'react-native';
import { BiteShareContext } from '../../../BiteShareContext';
import Menu from './Menu';

const styles = StyleSheet.create({
  container: {
    height: '75%',
    margin: 5
  },
});

const SessionMenu = () => {
  const { state: { restaurantName, restaurantId, restaurantMenus}, dispatch } = useContext(BiteShareContext);

  const renderMenus = ({item}) => {
    return (<Menu menu={item} />);
  };

  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        data={restaurantMenus}
        renderItem={renderMenus}
        keyExtractor={item => item.key}
      />

    </SafeAreaView>
  );

};

export default SessionMenu;