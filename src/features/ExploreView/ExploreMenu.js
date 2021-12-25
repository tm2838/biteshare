import React, { useContext } from 'react';
import { Appbar, List} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../../infrastructure/colors';
import { fonts } from '../../infrastructure/fonts';
import { BiteShareContext } from '../../BiteShareContext';


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: colors.brand.body,
  },
  restaurantHeader: {
    backgroundColor: colors.brand.login,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  restaurantHeading: {
    fontFamily: fonts.body,
    fontSize: 8,
    height: 25,

  },


});

const CurrentSessionHeader = () => {
  const {state: { restaurantName, resturantAddress }, dispatch } = useContext(BiteShareContext);

  return (
    <View style = {styles.container}>
      <Appbar.Header style = {styles.restaurantHeader} >
        <Appbar.Content title={restaurantName} subtitle={resturantAddress} style = {styles.restaurantHeading}/>
      </Appbar.Header>
      <List.Subheader>
        <Text>Appetizer</Text>
      </List.Subheader>
      <List.Item
        title="First Item"
        description="Item description"
        right={props => <List.Icon {...props} icon="folder" />}
      />
    </View>

  );
};

export default CurrentSessionHeader;

{ /* <View style = {styles.currentSessionContainer}>
        <View style = {styles.restaurant}>
          <Text style = {styles.restaurantName}>
            {restaurantName}
          </Text>
        </View>
        <View style={styles.profile}>
          <View>
            <Text style = {styles.accountTypeText}>{accountType}</Text>
          </View>
          <View>
            <Avatar.Image source={require(profilePicturePath)} />
          </View>
          <View>
            <Text style = {styles.accountHolderName}>{accountHolderName}</Text>
          </View>
        </View>
      </View> */ }