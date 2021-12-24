import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
const CurrentSessionMenu = ({ changeTab }) => {
  return (
    <View style = {styles.menuContainer}>
      <Text>This is Menu Screen.</Text>
    </View>
  );
};

export default CurrentSessionMenu;