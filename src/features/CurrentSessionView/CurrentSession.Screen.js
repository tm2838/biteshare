import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SafeArea from '../../components/SafeArea';
import CurrentSessionHeader from './CurrentSessionHeader';
import CurrentSessionSummary from './currentSessionSummary/CurrentSessionSummary.Screen';
import CurrentSessionTopNavBar from './CurrentSessionNavBar';
import CurrentSessionBills from './currentSessionBills/CurrentSessionBills.Screen';
import CurrentSessionQRCode from './currentSessionQRCode/currentSessionQRCode.Screen';
import CurrentSessionMenu from './currentSessionMenu/CurrentSessionMenu.Screen';
import { BiteShareContext } from '../../BiteShareContext';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexBasis: 30
  }
});

const CurrentSessionScreen = ({route, navigation}) => {
  const { state: { accountType}, dispatch } = useContext(BiteShareContext);
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