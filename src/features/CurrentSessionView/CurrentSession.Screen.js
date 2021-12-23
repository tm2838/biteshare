import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SafeArea from '../../components/SafeArea';
import CurrentSessionHeader from './CurrentSessionHeader';
import CurrentSessionSummary from './currentSessionSummary/CurrentSessionSummary';

const CurrentSessionScreen = () => {
  return (
    <SafeArea>
      <View>
        <CurrentSessionHeader />
        <CurrentSessionSummary />
      </View>
    </SafeArea>
  );
};

export default CurrentSessionScreen;