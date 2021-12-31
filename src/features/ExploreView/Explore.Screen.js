/* eslint-disable camelcase */
import React, { useEffect, useContext } from 'react';
import { BiteShareContext } from '../../BiteShareContext.js';
import mockRestaurants from '../../../fixtures/mockRestaurants.json';
import { Searchbar } from 'react-native-paper';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Pressable } from 'react-native';
import ExploreHeader from './ExploreHeader';
import SafeArea from '../../components/SafeArea';
import ExploreMenu from './ExploreMenu';
import RestaurantInfo from './RestaurantInfo';
import { colors } from '../../infrastructure/colors';
import getLocation from './LocationHelper';

const styles = StyleSheet.create({
  search: {
    padding: 30,
    paddingBottom: 10
  }
});


const ExploreScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  //onIconPress should update state

  const { state: { restaurants, restaurantId }, dispatch } = useContext(BiteShareContext);

  //@TODO: update to use real data
  useEffect(() => {
    getLocation();
    const restaurantsData = mockRestaurants.data;
    dispatch({ type: 'SET_RESTAURANTS', restaurants: restaurantsData });
  }, [mockRestaurants]);

  const renderRestaurant = (restaurant) => (<RestaurantInfo restaurant={restaurant.item} />);

  return (
    <SafeArea>
      <View>
        <ExploreHeader />
        {
          restaurantId ? <ExploreMenu navigation={navigation} /> :
            <>
              <View style={styles.search}>
                <Searchbar
                  placeholder="Zipcode: 48103"
                  onChangeText={onChangeSearch}
                  value={searchQuery}
                  iconColor={colors.brand.rausch}
                  onIconPress={() => alert('Icon pressed!')}
                />
                {/* <Pressable onPress={useCurrentLocation}>
                  <Text>Hey</Text>
                </Pressable> */}
                {/* <LocationHelper /> */}
              </View>

              <FlatList
                data={restaurants}
                renderItem={renderRestaurant}
                keyExtractor={restaurant => restaurant.restaurant_name}
              />
            </>
        }
      </View>
    </SafeArea>
  );
};

export default ExploreScreen;