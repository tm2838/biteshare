import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import ExploreHeader from './ExploreHeader';
import SafeArea from '../../components/SafeArea';

const ExploreScreen = () => {
  return (
    <SafeArea>
      <View>
        <ExploreHeader />
      </View>
    </SafeArea>
  );
};

export default ExploreScreen;