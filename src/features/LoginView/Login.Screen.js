import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import SafeArea from '../../components/SafeArea';
import InputField from '../../components/InputField';
import { theme } from '../../infrastructure/index';

// console.log('colors', theme);
const styles = StyleSheet.create({
  loginContainer: {
    backgroundColor: theme.colors.brand.login,
    flex: 1
  },
  title: {
    flex: 2
  },
  loginEntries: {
    flex: 1
  }
});


export default function LoginScreen() {
  return (
    <SafeArea>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>BiteShare</Text>
        <InputField
          placeholder={'Username'}
          secureText={false} />
        <InputField
          placeholder={'Password'}
          secureText={true} />
      </View>
    </SafeArea>
  );
}
