/* eslint-disable camelcase */
import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { BiteShareContext } from '../../BiteShareContext.js';
import mockRestaurants from '../../../fixtures/mockRestaurants.json';
import { Searchbar } from 'react-native-paper';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import ExploreHeader from './ExploreHeader';
import SafeArea from '../../components/SafeArea';
import ExploreMenu from './ExploreMenu';
import RestaurantInfo from './RestaurantInfo';
import { colors } from '../../infrastructure/colors';


const styles = StyleSheet.create({
  search: {
    padding: 30,
    paddingBottom: 10
  }
});


const ExploreScreen = ({ navigation }) => {

  const [zipcodeQuery, setZipcodeQuery] = React.useState('');
  const onZipcodeChangeSearch = query => setZipcodeQuery(query);

  const [restaurantNameQuery, setRestaurantNameQuery] = React.useState('');
  const onRestaurantNameChangeSearch = query => setRestaurantNameQuery(query);

  //ADD OWN API KEY
  const APIkey = '16bcb6bcff21e2fbcbad3fd5c5ca4605';
  const BASE_URL = 'https://api.documenu.com/v2/restaurants';

  const { state: { restaurants, restaurantsImages, restaurantId }, dispatch } = useContext(BiteShareContext);

  //@TODO: might completely remove the initial load of explore page restaurants based on find current location functionality
  useEffect(() => {
    const restaurantsData = mockRestaurants.data;
    dispatch({ type: 'SET_RESTAURANTS', restaurants: restaurantsData });
  }, [mockRestaurants]);

  const getImages = () => {
    axios.get('https://api.unsplash.com/photos/random?query=food&client_id=GHgiPIKZT9Y-KTj_C0kolwugQpmWl1rGH2AetMxwanU&count=25')
      .then(results => {
        const images = results.data.map(obj => obj.urls.regular);
        dispatch({ type: 'SET_RESTAURANTS_IMAGES', restaurantsImages: images });
      })
      .catch(err => {
        console.log(err);
      });
  };

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
          dispatch({ type: 'SET_RESTAURANTS', restaurants: results.data.data });
        })
        .catch(err => {
          alert('failed to load, try again');
        });
    } else {
      axios.get(`${BASE_URL}/search/fields?restaurant_name=${restaurantName}&zip_code=${zipcode}`, config)
        .then(results => {
          dispatch({ type: 'SET_RESTAURANTS', restaurants: results.data.data });
        })
        .catch(err => {
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
                  onPress={() => {
                    getImages();
                    getRestaurants(restaurantNameQuery, zipcodeQuery);
                  }}>
                  <Text style={{ color: colors.brand.kazan, fontWeight: '600' }}>Search</Text>
                </TouchableOpacity>

              </View>

              <FlatList
                data={restaurants}
                renderItem={({ item, index }) => <RestaurantInfo restaurant={item} image={restaurantsImages[index]} />}
                keyExtractor={restaurant => restaurant.restaurant_id}
              />
            </>
        }

      </View>
    </SafeArea>
  );
};

export default ExploreScreen;