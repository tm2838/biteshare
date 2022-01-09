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
  },
  form: {
    flex: 1,
    fontSize: 15,
    //Optional background color to differentiate form entry
    // backgroundColor: colors.brand.kazanLight2,
  }
});

const AccountInfo = ({ heading, info }) => {
  const [display, setDisplay] = useState('text');

  //TODO
  //ON SUBMIT FX() TO UPDATE USER COLLECTION IN DATABASE
  //CALL renderInfo() ON COMPLETTION TO REVERT BACK TO TEXT INPUT
  //MAY NEED TO PLACE THIS FX() IN PARENT COMPONENT TO RERENDER WITH PROPER INFO


  const handleTextClick = (val) => {
    console.log(val);
    setDisplay(val);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{heading}:</Text>

      {display === 'text' && <Text style={styles.text}>{info}</Text>}
      {display === 'form' && <TextInput
        style={styles.form}
        placeholder={info}
        onSubmitEditing={() => {
          // alert('Submitted form data');
          handleTextClick('text');
        }}
      />}

      {display === 'text' && <Icon
        name='build'
        size={20}
        onPress={() => {
          handleTextClick('form');
        }}
      />}

    </View>
  );
};

export default AccountInfo;
