import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SafeArea from '../../components/SafeArea';
import CurrentSessionHeader from './CurrentSessionHeader';
import CurrentSessionSummary from './currentSessionSummary/CurrentSessionSummary.Screen';
import CurrentSessionTopNavBar from './CurrentSessionNavBar';
import CurrentSessionBills from './currentSessionBills/CurrentSessionBills.Screen';
import CurrentSessionQRCode from './currentSessionQRCode/currentSessionQRCode.Screen';
import CurrentSessionMenu from './currentSessionMenu/CurrentSessionMenu.Screen';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexBasis: 30
  }
});

const CurrentSessionScreen = ({route, navigation}) => {
  // console.log('-------------------Current Session------------', route);
  const [currentTab, setCurrentTab] = useState('Menu');

  useEffect(()=>{
    console.log('-------------------Current Session------------', route);
    // ************  Crystal's notes:
    // The following code allows the navigation from 'create a session' to 'QR code'***
    //**** should be working, if not, comment out line31-34 ****

    if (route.params?.previous === 'create a session') {
      setCurrentTab('QR Code');
    }
    //For Guest- after guest notification from host, will direct them to Summary page
    if (route.params?.previous === 'coming from join tab') {
      setCurrentTab('Summary');
    }

  }, []);

  return (
    <SafeArea>
      <View style={styles.container}>
        <CurrentSessionHeader />
        <CurrentSessionTopNavBar changeTab={setCurrentTab} currentTab={currentTab} />
        {currentTab === 'Menu' && <CurrentSessionMenu changeTab={setCurrentTab} />}
        {currentTab === 'Bills' && <CurrentSessionBills changeTab={setCurrentTab} />}
        {currentTab === 'QR Code' && <CurrentSessionQRCode changeTab={setCurrentTab} />}
        {currentTab === 'Summary' && <CurrentSessionSummary changeTab={setCurrentTab} />}
      </View>
    </SafeArea>
  );
};

export default CurrentSessionScreen;