import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BiteshareButton from '../../../components/BiteshareButton.js';
import { colors } from '../../../infrastructure/colors.js';
import { BiteShareContext } from '../../../BiteShareContext.js';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  titleContainer: {
    borderRadius: 5,
    backgroundColor: '#C4C4C4',
    padding: 15,
    height: 60,
    width: 400,
  },
  title: {
    fontSize: 20,
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5
  }
});

const SplitBillOptions = ({ changeTab }) => {
  const navigation = useNavigation();
  const { state: { isEveryoneReady }, dispatch } = useContext(BiteShareContext);
  const titleContainerStyle = isEveryoneReady ? [ styles.titleContainer, { backgroundColor: colors.brand.ebisuLight }] : styles.titleContainer;
  const buttonStyle = isEveryoneReady ? { backgroundColor: colors.brand.ebisuLight } : {};

  const handleSplitEvenly = (event) => {
    dispatch({ type: 'SET_SPLIT_METHOD', splitMethod: 'Evenly' });
    changeTab('Bills');
  };

  const handleSplitByItem = (event) => {
    dispatch({ type: 'SET_SPLIT_METHOD', splitMethod: 'By item' });
    changeTab('Bills');
  };

  return (
    <View style={styles.container}>
      <View style={titleContainerStyle}>
        <Text style={styles.title}>How do you want to split the bill?</Text>
      </View>
      <View style={styles.buttonContainer}>
        <BiteshareButton title='Evenly' buttonStyle={buttonStyle} onPress={handleSplitEvenly} />
        <BiteshareButton title='By Item' buttonStyle={buttonStyle} onPress={handleSplitByItem} />
      </View>
    </View>
  );
};

export default SplitBillOptions;