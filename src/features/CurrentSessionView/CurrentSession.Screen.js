import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import SafeArea from '../../components/SafeArea';
import CurrentSessionHeader from './CurrentSessionHeader';
import CurrentSessionSummary from './currentSessionSummary/CurrentSessionSummary.Screen';
import CurrentSessionTopNavBar from './CurrentSessionNavBar';
import CurrentSessionBills from './currentSessionBills/CurrentSessionBills.Screen';
import CurrentSessionQRCode from './currentSessionQRCode/currentSessionQRCode.Screen';
import CurrentSessionMenu from './currentSessionMenu/CurrentSessionMenu.Screen';
import { BiteShareContext } from '../../BiteShareContext';
import { colors } from '../../infrastructure/colors';
import { fonts } from '../../infrastructure/fonts';
import { getADocReferenceFromCollection, readDocSnapshotListener } from '../../../firebase/helpers/database.firebase.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexBasis: 30
  },
  messageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 300,
  },
  messageText: {
    textAlign: 'center',
    fontFamily: fonts.heading,
    height: 50,
    fontSize: 20,
  },
  navigationText: {
    textAlign: 'center',
    fontSize: 15,
    color: colors.brand.rausch
  }
});

const CurrentSessionScreen = ({route, navigation}) => {
  const { state: { accountType, sessionId, joinRequest, nickname, accountHolderName }, dispatch } = useContext(BiteShareContext);
  const [currentTab, setCurrentTab] = useState('Menu');

  useEffect(()=>{

    // ************  Crystal's notes:
    // The following code allows the navigation from 'create a session' to 'QR code'***
    //**** should be working, if not, comment out line31-34 ****

    if (route.params?.previous === 'create a session') {
      setCurrentTab('QR Code');
    }
    //For Guest- after guest notification from host, will direct them to Menu page
    if (route.params?.previous === 'coming from join tab') {
      setCurrentTab('Menu');
    }

  }, [route.params]);

  useEffect(() => {
    if (sessionId) {
      getADocReferenceFromCollection(`transactions/${sessionId}/attendees`, 'name', '==', nickname || accountHolderName)
        .then((qResult) => {
          qResult.forEach((doc) => {
            readDocSnapshotListener(`transactions/${sessionId}/attendees`, doc.id, (doc) => {
              const docData = doc.data();
              if (docData.joinRequest === 'denied') {
                dispatch({ type: 'SET_CLEAR_CONTEXT' });
              }
            });
          });
        });
    }
  }, [sessionId]);

  return (
    <SafeArea>
      <View style={styles.container}>
        <CurrentSessionHeader />
        {(sessionId === '' || joinRequest !== 'allowed') && <View style={styles.messageContainer}>
          <Text style={styles.messageText}> You are not in an active meal session.</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
              <Text style={styles.navigationText}>Create a session    </Text>
            </TouchableOpacity>
            <Text>or</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Join')}>
              <Text style={styles.navigationText}> join  </Text>
            </TouchableOpacity>
            <Text>one.</Text>
          </View>
        </View>}
        {(sessionId !== '' && joinRequest === 'allowed') && <>
          <CurrentSessionTopNavBar changeTab={setCurrentTab} currentTab={currentTab} />
          {currentTab === 'Menu' && <CurrentSessionMenu changeTab={setCurrentTab} />}
          {currentTab === 'Bills' && <CurrentSessionBills changeTab={setCurrentTab} />}
          {currentTab === 'QR Code' && <CurrentSessionQRCode changeTab={setCurrentTab} />}
          {currentTab === 'Summary' && <CurrentSessionSummary changeTab={setCurrentTab} />}
        </>}
      </View>
    </SafeArea>
  );
};

export default CurrentSessionScreen;