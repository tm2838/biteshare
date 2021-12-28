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

const RestaurantInfo = ({ restaurant }) => {
  // const {
  //   restaurant_name,
  //   photo = 'https://www.foodiesfeed.com/free-food-photo/noodles-with-egg-and-vegetables/',
  //   restaurant_phone,
  //   price_range,
  //   restaurant_id,
  //   cuisines = [],
  //   address = { street: '111 Made up Street' }
  // } = restaurant;
  const seeFullMenuButtonPress = (restaurantId) => {
    alert(`restaurantId: ${restaurantId}`);
  };

  // console.log('RESTAURANT: ', restaurant);
  return (
    <View style={styles.restaurantContainer}>
      <Card style={styles.card} elevation={2}>
        <Card.Cover key={restaurant.restaurant_name} source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Title title={restaurant.restaurant_name} subtitle={restaurant.price_range || 'price range'} />
        <Card.Content>
          {restaurant.cuisines.length && <Text>{restaurant.cuisines.join(', ')}</Text>}
          <Text>{restaurant.restaurant_phone}</Text>
          <Text>{restaurant.address.street}</Text>
          {/* <Text>{restaurant.restaurant_id}</Text> */}
        </Card.Content>
        <Card.Actions>
          <Button
            onPress={() => seeFullMenuButtonPress(restaurant.restaurant_id)}
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