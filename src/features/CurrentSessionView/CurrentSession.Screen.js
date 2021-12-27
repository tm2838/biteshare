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

const CurrentSessionScreen = ({route}) => {
  console.log('route---->', route);

  const [currentTab, setCurrentTab] = useState('Menu');
  console.log('Current Tab---->', currentTab);
  useEffect(()=>{
    console.log('route--************************************>', route);
    // ************  Crystal's notes: The following code allows the navigation from 'create a session' to 'QR code'***
    //**** will revisit again after the explore page is implemented ****
    // if (route.params.previous === 'create a session') {
    //   setCurrentTab('QR Code');
    // }
  }, []);

  return (
    <SafeArea>
      <View style = {styles.container}>
        <CurrentSessionHeader />
        <CurrentSessionTopNavBar changeTab = {setCurrentTab} currentTab = {currentTab} />
        {currentTab === 'Menu' && <CurrentSessionMenu changeTab = {setCurrentTab} />}
        {currentTab === 'Bills' && <CurrentSessionBills changeTab = {setCurrentTab} />}
        {currentTab === 'QR Code' && <CurrentSessionQRCode changeTab = {setCurrentTab} />}
        {currentTab === 'Summary' && <CurrentSessionSummary changeTab = {setCurrentTab} />}
      </View>
    </SafeArea>
  );
};

export default CurrentSessionScreen;