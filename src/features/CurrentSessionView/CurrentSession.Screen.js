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

  const [currentTab, setCurrentTab] = useState('Menu');
  useEffect(()=>{
    // console.log('route-->', route);
    if (route.params.previous === 'create a session') {
      setCurrentTab('QR Code');
    }
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