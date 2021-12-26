import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import ExploreHeader from './ExploreHeader';
import SafeArea from '../../components/SafeArea';
import ExploreMenu from './ExploreMenu';

const ExploreScreen = ({navigation}) => {
  return (
    <SafeArea>
      <View>
        <ExploreHeader />
        <ExploreMenu />
      </View>
    </SafeArea>
  );
};

export default ExploreScreen;