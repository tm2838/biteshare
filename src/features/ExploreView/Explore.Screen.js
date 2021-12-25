import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import ExploreHeader from './ExploreHeader';
import SafeArea from '../../components/SafeArea';
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

const ExploreScreen = () => {
  return (
    <SafeArea>
      <View>
        <ExploreHeader />
        <View style={styles.exploreTitleContainer}>
          <Text style={styles.exploreTitle}>Testing</Text>
        </View>
      </View>
    </SafeArea>
  );
};

export default ExploreScreen;