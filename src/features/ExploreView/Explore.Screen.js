/* eslint-disable camelcase */
import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { BiteShareContext } from '../../BiteShareContext.js';
import mockRestaurants from '../../../fixtures/mockRestaurants.json';
import { Searchbar } from 'react-native-paper';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Pressable } from 'react-native';
import ExploreHeader from './ExploreHeader';
import SafeArea from '../../components/SafeArea';
import ExploreMenu from './ExploreMenu';
import RestaurantInfo from './RestaurantInfo';
import { colors } from '../../infrastructure/colors';
import * as Location from 'expo-location';

const styles = StyleSheet.create({
  search: {
    padding: 30,
    paddingBottom: 10
  }
});

const ExploreScreen = ({ navigation }) => {

  const [zipcodeQuery, setZipcodeQuery] = React.useState('');
  const onZipcodeChangeSearch = query => setZipcodeQuery(query);
  // instead of having a separate function "onZipcodeChangeSearch"
  // you can just call "setZipcodeQuery(query)" in "onChangeText"

  const [restaurantNameQuery, setRestaurantNameQuery] = React.useState('');
  const onRestaurantNameChangeSearch = query => setRestaurantNameQuery(query);

  //ADD OWN API KEY
  const APIkey = 'OWN_KEY_GOES_HERE';
  const BASE_URL = 'https://api.documenu.com/v2/restaurants';

  const { state: { restaurants, restaurantId }, dispatch } = useContext(BiteShareContext);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    let longitude = location.coords.longitude;
    let latitude = location.coords.latitude;
    let address = await Location.reverseGeocodeAsync({ latitude, longitude });
    setZipcodeQuery(address[0].postalCode);
    console.log(zipcodeQuery);
    // dispatch({ type: 'SET_CURRENTZIP', currentZip: address[0].postalCode });
  };
  //@TODO: might completely remove the initial load of explore page restaurants based on find current location functionality
  useEffect(() => {
    const restaurantsData = mockRestaurants.data;
    dispatch({ type: 'SET_RESTAURANTS', restaurants: restaurantsData });
  }, [mockRestaurants]);

  useEffect(() => {
    return getLocation();
  }, []);

  const renderRestaurant = (restaurant) => (<RestaurantInfo restaurant={restaurant.item} />);

  const getRestaurants = (restaurantName, zipcode) => {

    const config = {
      headers: {
        'X-API-KEY': APIkey
      }
    };

    //if user entered city instead of zipcode
    if (zipcode && isNaN(zipcode)) {
      axios.get(`${BASE_URL}/search/fields?restaurant_name=${restaurantName}&address=${zipcode}`, config)
        .then(results => {
          // console.log(results.data);
          dispatch({ type: 'SET_RESTAURANTS', restaurants: results.data.data });
        })
        .catch(err => {
          // console.log(err);
          alert('failed to load, try again');
        });
    } else {
      axios.get(`${BASE_URL}/search/fields?restaurant_name=${restaurantName}&zip_code=${zipcode}`, config)
        .then(results => {
          // console.log(results.data);
          dispatch({ type: 'SET_RESTAURANTS', restaurants: results.data.data });
        })
        .catch(err => {
          // console.log(err);
          alert('failed to load, try again');
        });
    }
  };

  return (
    <SafeArea>
      <View>
        <ExploreHeader />
        {
          restaurantId ? <ExploreMenu navigation={navigation} /> :
            <>
              <View style={styles.search}>
                <Searchbar
                  placeholder="Enter Restaurant Name"
                  onChangeText={onRestaurantNameChangeSearch}
                  value={restaurantNameQuery}
                  icon={() => null}
                  style={{ elevation: 0 }}
                />
                <Searchbar
                  placeholder="Enter Zip Code or City"
                  onChangeText={onZipcodeChangeSearch}
                  value={zipcodeQuery}
                  icon={() => null}
                  style={{ elevation: 0 }}
                />

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => { getRestaurants(restaurantNameQuery, zipcodeQuery); }}>
                  <Text style={{ color: colors.brand.kazan, fontWeight: '600' }}>Search</Text>
                </TouchableOpacity>

              </View>

              <FlatList
                data={restaurants}
                renderItem={renderRestaurant}
                keyExtractor={restaurant => restaurant.restaurant_id}
              />
            </>
        }
      </View>
    </SafeArea>
  );
};

export default ExploreScreen;