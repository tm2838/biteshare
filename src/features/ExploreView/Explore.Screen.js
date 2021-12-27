import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import ExploreHeader from './ExploreHeader';
import SafeArea from '../../components/SafeArea';
// import ExploreMenu from './ExploreMenu';
import { colors } from '../../infrastructure/colors';


const styles = StyleSheet.create({
  exploreTitle: {
    color: colors.brand.kazan,
    fontSize: 24,
  },

  exploreTitleContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

const ExploreScreen = ({navigation}) => {
  return (
    <SafeArea>
      <View>
        <ExploreHeader />
        {/* <ExploreMenu /> */}
        <View style={styles.exploreTitleContainer}>
          <Text style={styles.exploreTitle}>Testing</Text>
        </View>
      </View>
    </SafeArea>
  );
};

export default ExploreScreen;