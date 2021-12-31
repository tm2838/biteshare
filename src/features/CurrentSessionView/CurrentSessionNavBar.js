import React, {useContext, useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import BackButton from '../../components/BackButton';
import { BiteShareContext } from '../../BiteShareContext';
import { colors } from '../../infrastructure/colors';


const styles = StyleSheet.create({
  topBarContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.brand.beachLight,
    maxHeight: 60
  },
  images: {
    height: 40,
    width: 40,
  },
  activeImages: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  tabs: {
    flex: 1,
    flexGrow: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  backButton: {
    flexGrow: 1,
  },
  tabsImages: {
    alignItems: 'center',
  }
});



const CurrentSessionTopNavBar = ({ changeTab, currentTab }) => {
  const { state: {accountType}, dispatch } = useContext(BiteShareContext);
  const [bills, setBills] = useState('Bills');
  const [menu, setMenu] = useState('Menu');
  const [qrCode, setQrCode] = useState('QR Code');
  const [summary, setSummary] = useState('Summary');

  const handleTabRouting = (val) => {
    changeTab(val);
  };

  return (
    <View style = {styles.topBarContainer}>
      <View style = {styles.backButton}>
        <BackButton screenName="Join" />
      </View>
      <View style = {styles.tabs}>
        <View>
          <TouchableOpacity onPress={() => handleTabRouting(bills)} style={styles.tabsImages} >
            <Image style = {currentTab === 'Bills' ? styles.activeImages : styles.images} source={require('../../../assets/bill-image.png')}/>
            <Text>{bills}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => handleTabRouting(menu)} style={styles.tabsImages}>
            <Image style = {currentTab === 'Menu' ? styles.activeImages : styles.images} source={require('../../../assets/menu-image.png')}/>
            <Text>{menu}</Text>
          </TouchableOpacity>
        </View>
        {accountType === 'HOST' && <View>
          <TouchableOpacity onPress={() => handleTabRouting(qrCode)} style={styles.tabsImages}>
            <Image style = {currentTab === 'QR Code' ? styles.activeImages : styles.images} source={require('../../../assets/qr-code-image.png')}/>
            <Text>{qrCode}</Text>
          </TouchableOpacity>
        </View>}
        <View>
          <TouchableOpacity onPress={() => handleTabRouting(summary)} style={styles.tabsImages}>
            <Image style = {currentTab === 'Summary' ? styles.activeImages : styles.images} source={require('../../../assets/summary-image.png')}/>
            <Text>{summary}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  );
};

export default CurrentSessionTopNavBar;