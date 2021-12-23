import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { BiteShareContext } from '../BiteShareContext';
import BiteshareButton from '../components/BiteshareButton.js';
import { colors } from '../infrastructure/colors.js';

const Title1 = styled.Text`
color: ${(props) => props.theme.colors.brand.rausch}`;
const Title2 = styled.Text`
  color: ${(props) => props.theme.colors.brand.beach}
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.brand.ebisuLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const DummyComponent = () => {
  const { state: { role }, dispatch } = useContext(BiteShareContext);
  const handleButtonPress = () => {
    dispatch({ type: 'SET_ROLE', role: ['guest', 'host'].filter((r) => r !== role)[0]});
  };

  return (
    // eslint-disable-next-line no-use-before-define
    <View style={styles.container}>
      <Title1>
        Welcome to Biteshare!!
      </Title1>
      <Title2>
        Welcome to Biteshare!!
      </Title2>
      <Text>I am a {role}</Text>
      <BiteshareButton
        title="Button"
        buttonStyle={{ backgroundColor: colors.brand.beachLight }}
        onPress={handleButtonPress}
      />
    </View>

  );
};


export default DummyComponent;