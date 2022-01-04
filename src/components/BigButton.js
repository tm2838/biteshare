import React from 'react';
import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native';
import { theme } from '../infrastructure/index';

const styles = StyleSheet.create({
  button: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: theme.colors.brand.beach,
    borderRadius: 4,
    width: '40%',
    height: 50,
    marginVertical: 10
  },
  title: {
    // flex: 1,
    textAlign: 'center',
    fontFamily: theme.fonts.heading,
    fontSize: 32,
  },
});

const BigButton = ({ title, handleLogin }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handleLogin}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default BigButton;
