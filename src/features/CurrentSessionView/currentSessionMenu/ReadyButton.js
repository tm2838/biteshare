import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BiteshareButton from '../../../components/BiteshareButton.js';
import { colors } from '../../../infrastructure/colors.js';
import { BiteShareContext } from '../../../BiteShareContext.js';
// import CurrentSession from '../CurrentSession.Screen';

const styles = StyleSheet.create({

  container: {
    alignItems: 'center',
    marginTop: 5,
  },

});

const ReadyButton = ({changeTab}) => {
  const navigation = useNavigation();
  const { state: { sessionId }, dispatch } = useContext(BiteShareContext);


  const menuChoice = () => {
    changeTab('Summary');
    // alert('Your choice is : Excellent');
    // <CurrentSession route={{test: 'CurrentSession'}}/>;
    //@TODO ****
    // When user click 'ready'
    // menu choice (more than one || just one item for the purpose of MVP)
    // update DB with - {sessionId: 1234, userName: 'Greg', userId: 8776, menuName: 'pizza', menuDescription:'small', menuPrice: 12.95} under 'transaction' collections
    // redirect to summary page
  };

  return (
    <View style={styles.container}>
      <BiteshareButton title={'I\'m Ready'} buttonStyle={{ backgroundColor: colors.brand.beachLight }} onPress={menuChoice} />
    </View>
  );
};

export default ReadyButton;