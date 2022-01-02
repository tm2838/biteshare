import React, { useContext } from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { colors } from '../../infrastructure/colors';
import { StyleSheet, Text, View, Image } from 'react-native';
import { BiteShareContext } from '../../BiteShareContext';

const styles = StyleSheet.create({
  container: {
    flex: .5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brand.ebisuLight2,
    margin: 5,
    justifyContent: 'space-between',

    borderRadius: 15,
    height: 15,
    marginRight: 20,

    borderColor: 'black',
    borderWidth: 1
  },
});

const PreviousBite = () => {

  return (
    <View style={styles.container}>

      {/* Scrollable list of previous bites */}

      <Text> Restauraunt </Text>
      <Text> Guest / Host </Text>
      <Text> Price </Text>

    </View>
  );
};

export default PreviousBite;