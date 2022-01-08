import React, { useContext, useState, useEffect } from 'react';
import { Icon } from 'react-native-elements';

import { colors } from '../../../infrastructure/colors';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import { BiteShareContext } from '../../../BiteShareContext';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brand.ebisuLight2,
    margin: 5,
    justifyContent: 'space-around',

    borderRadius: 15,
    height: 40,
    marginRight: 20,
    marginTop: 10,

    flex: 1
  },
  text: {
    flex: 1,
    fontSize: 15
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold'
  }
});

const AccountInfo = ({ heading, info }) => {

  const [display, setDisplay] = useState('text');

  //TODO
  //Create state variable to conditionally render row
  //Edit state from icon click

  //TODO
  //ON SUBMIT FX() TO UPDATE USER COLLECTION IN DATABASE
  //CALL renderInfo() ON COMPLETTION TO REVERT BACK TO TEXT INPUT
  //MAY NEED TO PLACE THIS FX() IN PARENT COMPONENT TO RERENDER WITH PROPER INFO


  const handleTextClick = () => {
    setDisplay('form');
  };

  useEffect(() => {
    console.log('Account state changed: ', display);
  }, [display]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{heading}:</Text>

      {display === 'text' && <Text style={styles.text}>{info}</Text>}
      {display === 'form' && <TextInput
        style={styles.text}
        placeholder={info}
        // onChangeText={update text field fx}
        // onFormSubmit={}?
      />}

      <Icon
        name='build'
        size={20}
        onPress={
          handleTextClick
        }
      />
    </View>
  );
};

export default AccountInfo;
