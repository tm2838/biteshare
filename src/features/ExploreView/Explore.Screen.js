/* eslint-disable camelcase */
import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { BiteShareContext } from '../../BiteShareContext.js';
import mockRestaurants from '../../../fixtures/mockRestaurants.json';
import { Searchbar } from 'react-native-paper';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
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

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  //onIconPress should update state
  const APIkey = '16bcb6bcff21e2fbcbad3fd5c5ca4605';
  const FIND_WITH_ZIP_URL = 'https://api.documenu.com/v2/restaurants/zip_code';
  const FIND_WITH_NAME_URL = 'https://api.documenu.com/v2/restaurants/search/fields?restaurant_name';

  const { state: { restaurants, restaurantId }, dispatch } = useContext(BiteShareContext);

  //@TODO: might completely remove the initial load of explore page restaurants based on find current location functionality
  useEffect(() => {
    const restaurantsData = mockRestaurants.data;
    dispatch({ type: 'SET_RESTAURANTS', restaurants: restaurantsData });
  }, [mockRestaurants]);

  const renderRestaurant = (restaurant) => (<RestaurantInfo restaurant={restaurant.item} />);

  const getRestaurants = (query) => {
    //if resaturant name
    if (isNaN(query)) {
      axios.get(`${FIND_WITH_NAME_URL}=${query}?key=${APIkey}`);

    } else {
      //if zipcode
      axios.get(`${FIND_WITH_ZIP_URL}/${query}?key=${APIkey}`)
        .then(results => {
          console.log(results.data);
          dispatch({ type: 'SET_RESTAURANTS', restaurants: results.data.data });
        })
        .catch(err => {
          console.log(err);
          alert('failed to load, try different zipcode');
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
                  placeholder="Enter Zip Code"
                  onChangeText={onChangeSearch}
                  value={searchQuery}
                  iconColor={colors.brand.rausch}
                  onIconPress={() => {
                    alert(`zipcode: ${searchQuery}`);
                    // getRestaurants(searchQuery);
                  }}
                />
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