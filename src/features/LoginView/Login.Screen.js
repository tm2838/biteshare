import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import SafeArea from '../../components/SafeArea';
import InputField from '../../components/InputField';
import { theme } from '../../infrastructure/index';

// console.log('colors', theme);
const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: theme.colors.brand.login,
  },
  biteshareTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: theme.fonts.heading,
    fontSize: 64,
    marginTop: 80
  },
  loginTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: theme.fonts.heading,
    fontSize: 32,
  },
  loginEntries: {
    flex: 3,
    padding: 20
  },
  signUp: {
    flex: 1,
    textAlign: 'center',
    fontFamily: theme.fonts.heading,
    textDecorationLine: 'underline'
  }
});

export default function LoginScreen() {
  return (
    <SafeArea>
      <View style={styles.loginContainer}>
        <Text style={styles.biteshareTitle}>BITESHARE</Text>
        <Text style={styles.loginTitle}>Login</Text>
        <View style={styles.loginEntries}>
          <InputField
            placeholder={'Username'}
            secureText={false} />
          <InputField
            placeholder={'Password'}
            secureText={true} />
          <Text>Don't have an account? <Text style={styles.signUp}>Sign Up</Text></Text>
        </View>
      </View>
    </SafeArea>
  );
}
