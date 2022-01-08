import React, { useContext } from 'react';
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
  icon: {

  }
});

const AccountInfo = ({ heading, info }) => {

  //TODO
  //Create state variable to conditionally render row
  //Edit state from icon click

  //TODO
  //ON SUBMIT FX() TO UPDATE USER COLLECTION IN DATABASE
  //CALL renderInfo() ON COMPLETTION TO REVERT BACK TO TEXT INPUT
  //MAY NEED TO PLACE THIS FX() IN PARENT COMPONENT TO RERENDER WITH PROPER INFO


  const renderInfo = (view) => {
    if (view === 'form') {
      return (
        <TextInput
          style={styles.text}
          placeholder={info}
          // onChangeText={update text field fx}
          // onFormSubmit={}?
        />
      );
    }

    return (
      <Text style={styles.text}>{info}</Text>
    );

  };

  return (
    <View style={styles.container}>

      <Text style={styles.text}>{heading}</Text>
      {renderInfo()}

      <Icon
        name='build'
        size={20}
        onClick={renderInfo('form')}
      />


    </View>
  );
};

export default AccountInfo;