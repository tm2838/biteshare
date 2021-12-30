/* eslint-disable camelcase */
import React, { useEffect, useContext } from 'react';
import { BiteShareContext } from '../../BiteShareContext.js';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Card } from 'react-native-paper';
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

const RestaurantInfo = ({ restaurant }) => {
  const { state: { restaurantId, restaurantName }, dispatch } = useContext(BiteShareContext);

  const seeFullMenuButtonPress = (restaurant_id, restaurant_name) => {
    dispatch({ type: 'SET_RESTAURANT_ID', restaurantId: restaurant_id });
    dispatch({ type: 'SET_RESTAURANT_NAME', restaurantName: restaurant_name }); //cs*- added restaurant_name to context API
    alert(`restaurant_id: ${restaurant_id}`);

  };

  // console.log('afterbuttonclick: ' + restaurantId);
  // console.log('RESTAURANT: ', restaurant);
  return (
    <View style={styles.restaurantContainer}>
      <Card style={styles.card} elevation={2}>
        <Card.Cover key={restaurant.restaurant_name} source={{ uri: 'https://loremflickr.com/320/240/food' }} />
        <Card.Title
          title={restaurant.restaurant_name}
          subtitle={restaurant.price_range || '$$'}
          subtitleStyle={{ color: colors.brand.rausch }} />
        <Card.Content>
          {restaurant.cuisines.length > 1 && <Text>{restaurant.cuisines.join(', ')}</Text>}
          <Text>{restaurant.restaurant_phone}</Text>
          <Text>{restaurant.address.street}</Text>
          {/* <Text>{restaurant.restaurant_id}</Text> */}
        </Card.Content>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => seeFullMenuButtonPress(restaurant.restaurant_id, restaurant.restaurant_name)}>
            <Text style={{ color: colors.brand.kazan, fontWeight: '600' }}>See Full Menu</Text>
          </TouchableOpacity>

        </View>
      </Card>
    </View>
  );
};

export default RestaurantInfo;