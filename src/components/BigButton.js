import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { theme } from '../infrastructure/index';

const styles = StyleSheet.create({
  button: {
    margin: 5,
    backgroundColor: theme.colors.brand.beach,
    borderRadius: 4,
    flex: 0.20,
    width: '40%',
    marginBottom: 20
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontFamily: theme.fonts.heading,
    fontSize: 32,
  },
});

const BigButton = ({ title, handleLogin }) => {
  return (
    <Pressable
      style={styles.button}
      onPress={handleLogin}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default BigButton;
