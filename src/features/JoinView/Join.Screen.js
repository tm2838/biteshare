import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import SafeArea from '../../components/SafeArea';
import JoinScreenHeader from './JoinScreenHeader';


const JoinScreen = ({ route, navigation }) => {
  return (
    <SafeArea>
      <View>
        <JoinScreenHeader />
      </View>
    </SafeArea>
  );
};

export default JoinScreen;