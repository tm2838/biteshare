import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SafeArea from '../../components/SafeArea';
import CurrentSessionHeader from './CurrentSessionHeader';

const CurrentSessionScreen = () => {
  return (
    <SafeArea>
      <View>
        <CurrentSessionHeader />
      </View>
    </SafeArea>
  );
};

export default CurrentSessionScreen;