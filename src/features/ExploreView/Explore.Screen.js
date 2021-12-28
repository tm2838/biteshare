import React from 'react';
import { Searchbar } from 'react-native-paper';
import { StyleSheet, Text, View, Image } from 'react-native';
import ExploreHeader from './ExploreHeader';
import SafeArea from '../../components/SafeArea';
import ExploreMenu from './ExploreMenu';
import RestaurantInfo from './RestaurantInfo';
import { colors } from '../../infrastructure/colors';


const styles = StyleSheet.create({
  search: {
    padding: 30
  }
});

const ExploreScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  //onIconPress should update state

  return (
    <SafeArea>
      <View>
        <ExploreHeader />
        {/* <ExploreMenu /> */}
        <View style={styles.search}>
          <Searchbar
            placeholder="Zipcode: 48103"
            onChangeText={onChangeSearch}
            value={searchQuery}
            iconColor={colors.brand.kazan}
            onIconPress={() => alert('Icon pressed!')}
          />
        </View>

        <RestaurantInfo />

      </View>
    </SafeArea>
  );
};

export default ExploreScreen;