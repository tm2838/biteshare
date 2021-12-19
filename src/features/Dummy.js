import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';

const Title1 = styled.Text`
color: ${(props) => props.theme.colors.brand.rausch}
`;
const Title2 = styled.Text`
  color: ${(props) => props.theme.colors.brand.beach}
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const DummyComponent = () => {
  return (
    <View style={styles.container}>
      <Title1>
        Welcome to Biteshare!!
      </Title1>
      <Title2>
        Welcome to Biteshare!!
      </Title2>
    </View>

  );
};



export default DummyComponent;