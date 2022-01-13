import React, { useContext } from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../../infrastructure/colors';
import { BiteShareContext } from '../../BiteShareContext';


const styles = StyleSheet.create({
  currentSessionHeader: {
    backgroundColor: colors.brand.kazan,
  },
  restaurantName: {
    color: 'white',
    fontSize: 15,
    marginLeft: 10,
  },
  profile: {
    flex: 1,
    flexBasis: '30%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '100%'
  },
  currentSessionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%'
  },
  restaurant: {
    flexBasis: '70%',
  },
  accountTypeText: {
    color: 'white',
    fontSize: 12,
  },
});

const CurrentSessionHeader = () => {
  const {state: { restaurantName, accountHolderName, accountType, sessionId, joinRequest }, dispatch } = useContext(BiteShareContext);
  const profilePicturePath = '../../../assets/profilePicture.png';
  const picSize = (sessionId === '' || joinRequest !== 'allowed') ? 40 : 35;
  const accountHolderNameStyle = (sessionId === '' || joinRequest !== 'allowed') ? { color: 'white' } : { color: 'white', fontSize: 12 };
  return (
    <Appbar.Header style = {styles.currentSessionHeader}>
      <View style = {styles.currentSessionContainer}>
        <View style = {styles.restaurant}>
          <Text style = {styles.restaurantName}>
            {restaurantName}
          </Text>
        </View>
        <View style={styles.profile}>
          {accountType !== '' && (
            <View>
              <Text style = {styles.accountTypeText}>{accountType}</Text>
            </View >
          )}
          <View>
            <Avatar.Image size = {picSize} style = {{backgroundColor: '#f2f2f2'}} source={require(profilePicturePath)} />
          </View>
          <View>
            <Text style = {accountHolderNameStyle}>{accountHolderName}</Text>
          </View>
        </View>
      </View>
    </Appbar.Header>
  );
};

export default CurrentSessionHeader;