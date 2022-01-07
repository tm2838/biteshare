import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../infrastructure/colors';
import { fonts } from '../infrastructure/fonts';

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontFamily: fonts.subHeading,
    textAlign: 'center',
  },
});

const Loading = ({ size = 'small', color = colors.brand.kazan, primaryMessage, secondaryMessage = '' }) => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size={size} color={color} />
    <Text style={styles.text}>{primaryMessage}</Text>
    {secondaryMessage !== '' && <Text>{secondaryMessage}</Text>}
  </View>
);

export default Loading;