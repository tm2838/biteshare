import React, { useContext } from 'react';
import { colors } from '../../../infrastructure/colors';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import { BiteShareContext } from '../../../BiteShareContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: 400,
    height: '45%',
    margin: 10,
    padding: 10,
    justifyContent: 'space-around',

    borderWidth: 1,
    borderColor: 'black'
  },
  title: {
    flex: .2,
    fontSize: 25,
    fontWeight: 'bold',
  },
});


const UserInfo = () => {
  const { state: { nickname, accountHolderName, email }, dispatch } = useContext(BiteShareContext);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Account Information </Text>

      <Text>Username</Text>
      <Text>Email</Text>
      <Text>Password</Text>

    </View>

  );
};

export default UserInfo;