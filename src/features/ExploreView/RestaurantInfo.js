/* eslint-disable camelcase */
import React, { useContext } from 'react';
import axios from 'axios';
import { BiteShareContext } from '../../BiteShareContext.js';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { colors } from '../../infrastructure/colors';


const styles = StyleSheet.create({
  exploreTitle: {
    color: colors.brand.kazan,
    fontSize: 24,
  },

  restaurantContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    height: 40,
    margin: 7,
    padding: 10,
    borderRadius: 50,
    backgroundColor: colors.brand.ebisuLight,
    color: colors.brand.rausch
  }
});

const RestaurantInfo = ({ restaurant, image }) => {
  const { state: { restaurantId, restaurantName, restaurantAddress }, dispatch } = useContext(BiteShareContext);


  const seeFullMenuButtonPress = (restaurant_id, restaurant_name, restaurant_address) => {
    console.log(restaurant_address);
    dispatch({ type: 'SET_RESTAURANT_ID', restaurantId: restaurant_id });
    dispatch({ type: 'SET_RESTAURANT_NAME', restaurantName: restaurant_name }); //cs*- added restaurant_name to context
    dispatch({ type: 'SET_RESTAURANT_ADDRESS', restaurantAddress: restaurant_address }); //add address
    // alert(`restaurant_id: ${restaurant_id}`);

  };

  return (
    <View style={styles.restaurantContainer}>
      <Card style={styles.card} elevation={2}>
        <Card.Cover key={restaurant.restaurant_name} source={{ uri: image }} />
        <Card.Title
          title={restaurant.restaurant_name}
          left={() => <Image source={require('../../../assets/explorelogo.png')} style={{ width: 30, height: 30 }} />}
          leftStyle={{ width: 20 }}
          subtitle={restaurant.price_range || '$$'}
          subtitleStyle={{ color: colors.brand.rausch }} />
        <Card.Content>
          {restaurant.cuisines.length > 0 && restaurant.cuisines[0].length > 0 && <Text>{restaurant.cuisines.join(', ')}</Text>}
          <Text>{restaurant.restaurant_phone}</Text>
          <Text>{restaurant.address.street}</Text>
        </Card.Content>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => seeFullMenuButtonPress(restaurant.restaurant_id, restaurant.restaurant_name, restaurant.address.street)}>
            <Text style={{ color: colors.brand.kazan, fontWeight: '600' }}>See Full Menu</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
};

export default RestaurantInfo;