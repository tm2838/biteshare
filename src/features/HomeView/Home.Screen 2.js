import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExploreScreen from '../ExploreView/Explore.Screen';
import JoinScreen from '../JoinView/Join.Screen';
import CurrentSessionScreen from '../CurrentSessionView/CurrentSession.Screen';
import ProfileScreen from '../ProfileView/Profile.Screen';
import BackButton from '../../components/BackButton';
import { colors } from '../../infrastructure/colors';
import { Image } from 'react-native';



const HomeScreen = () => {
  const Tab = createBottomTabNavigator();
  const screenOptions = ({ route }) => ({
    tabBarIcon: ({focused, color, size}) => {
      let imagePath;
      if (route.name === 'Explore') {
        imagePath = focused
          ? require('../../../assets/focused-explore.png')
          : require('../../../assets/explore.png');
      } else if (route.name === 'Join') {
        imagePath = focused
          ? require('../../../assets/focused-join.png')
          : require('../../../assets/join.png');
      } else if (route.name === 'CurrentSession') {
        imagePath = focused
          ? require('../../../assets/focused-currentSession.png')
          : require('../../../assets/currentSession.png');
      } else if (route.name === 'Profile') {
        imagePath = focused
          ? require('../../../assets/focused-profile.png')
          : require('../../../assets/profile.png');
      }
      return (
        <Image
          source = {imagePath}
          style = {{width: size, height: size}}
        />
      );
    },
    tabBarStyle: {
      backgroundColor: colors.brand.kazan,
    },
    tabBarActiveTintColor: colors.brand.rausch,
    tabBarInactiveTintColor: colors.brand.ebisu,
  });

  return (
    <Tab.Navigator
      screenOptions={screenOptions}
    >
      <Tab.Screen
        name="Explore"
        component = {ExploreScreen}
        options = { { headerShown: false } }
      />
      <Tab.Screen
        name="Join"
        component = {JoinScreen}
        options = { { headerShown: false } }
      />
      <Tab.Screen
        name="CurrentSession"
        component = {CurrentSessionScreen}
        options = { { headerShown: false } }
      />
      <Tab.Screen
        name="Profile"
        component = {ProfileScreen}
        options = { { headerShown: false } }
      />
    </Tab.Navigator>
  );

};

export default HomeScreen;