import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../infrastructure/colors';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  backButton: {
    padding: 10
  },
});

const BackButton = ({ screenName }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.backButton}>
      <Ionicons name="chevron-back" size={24} color={colors.brand.rausch} onPress={() => navigation.navigate(screenName)} />
    </View>
  );
};

export default BackButton;