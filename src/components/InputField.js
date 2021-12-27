import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    padding: 10
  }
});

export default function InputField({ inputValue, placeholder, secureText }) {
  // const [inputValue, setInputValue] = useState(null)

  return (<TextInput
    // value={value}
    onChangeText={inputValue}
    placeholder={placeholder}
    style={styles.input}
    secureTextEntry={secureText}
  />);
}


// export default InputField;