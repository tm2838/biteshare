import React, { useContext } from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, Text, View, Image } from 'react-native';
import { colors } from '../../infrastructure/colors';
import { BiteShareContext } from '../../BiteShareContext';

const styles = StyleSheet.create({
  exploreHeader: {
    backgroundColor: colors.brand.kazan,
  },
  exploreHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  headerText: {
    color: 'white',
    fontSize: 24
  }
});

const ExploreHeader = () => {
  const { state: { nickname, accountHolderName }, dispatch } = useContext(BiteShareContext);
  const profileLogoPath = '../../../assets/profile-logo.png';
  return (
    <Appbar.Header style={styles.exploreHeader}>
      <View style={styles.exploreHeaderContainer}>
        <View>
          <Text style={styles.headerText}>Welcome {nickname || accountHolderName}</Text>
        </View>
        <View>
          <Image
            source={require(profileLogoPath)}
          />
        </View>
      </View>
    </Appbar.Header>
  );
};

export default ExploreHeader;