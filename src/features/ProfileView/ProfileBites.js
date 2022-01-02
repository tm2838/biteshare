import React, { useContext } from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { colors } from '../../infrastructure/colors';
import { StyleSheet, Text, View, Image } from 'react-native';
import { BiteShareContext } from '../../BiteShareContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green',
    margin: 5
  },
});

const PreviousBite = () => {
  // const { state: { accountHolderName }, dispatch } = useContext(BiteShareContext);


  return (
    <View style={styles.container}>

      {/* Scrollable list of previous bites */}
      <Text>BITE BITE BITE BITE</Text>


    </View>
  );
};

export default PreviousBite;