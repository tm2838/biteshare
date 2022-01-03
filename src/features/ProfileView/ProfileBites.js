import React, { useContext } from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { colors } from '../../infrastructure/colors';
import { StyleSheet, Text, View, Image } from 'react-native';
import { BiteShareContext } from '../../BiteShareContext';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brand.ebisuLight2,
    margin: 5,
    justifyContent: 'space-around',

    borderRadius: 15,
    height: 40,
    marginRight: 20,
    marginTop: 10,
  },
  text: {
    flex: 1,
    fontSize: 15
  }
});

const PreviousBite = ({ meal }) => {

  return (
    <View style={styles.container}>

      <Text style={styles.text}>{meal.restauraunt}</Text>
      <Text style={styles.text}>{meal.hostStatus}</Text>
      <Text style={styles.text}>${meal.bill}</Text>

    </View>
  );
};

export default PreviousBite;