import React from 'react';
import { Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const styles = (size) => StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C4C4C4',
    borderRadius: size / 10,
    width: size,
    height: size / 3,
    margin: 10,
  },
  text: {
    color: '#000',
    fontSize: size / 5,
  }
});

const BiteshareButton = ({ size = 100, buttonStyle = {}, textStyle = {}, title, onPress = () => {}, disabled = false }) => {
  return (
    <TouchableOpacity style={[styles(size).button, buttonStyle]} onPress={onPress} disabled={disabled} testID='biteshare-button'>
      <Text style={[styles(size).text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default BiteshareButton;