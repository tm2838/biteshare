/* eslint-disable camelcase */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
    padding: 20
  }
});

const RestaurantInfo = (restaurant = {}) => {
  const {
    restaurant_name = 'Asian Restaurant',
    photo = 'https://www.foodiesfeed.com/free-food-photo/noodles-with-egg-and-vegetables/',
    restaurant_phone = '000 000 000',
    price_range = '$$',
    restaurant_id,
    cuisines = ['Asian'],
    address = { street: '111 Made up Street' }
  } = restaurant;


  return (
    <View style={styles.restaurantContainer}>
      <Card style={styles.card} elevation={2}>
        <Card.Cover key={restaurant_name} source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Title title={restaurant_name} subtitle={price_range} />
        <Card.Content>
          <Text>{cuisines[0]}</Text>
          <Text>{restaurant_phone}</Text>
          <Text>{address.street}</Text>
        </Card.Content>
        <Card.Actions>
          <Button
            onPress={() => alert('clicked!')}
            color={colors.brand.body}
            mode={'contained'}>
            See Full Menu
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default RestaurantInfo;