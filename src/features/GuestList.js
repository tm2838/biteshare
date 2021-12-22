import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const GuestList = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text>This is guest 1</Text>
      </View>
      <View>
        <Text>This is guest 2</Text>
      </View>
      <View>
        <Text>This is guest 3</Text>
      </View>
    </View>
  );
};

export default GuestList;