import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import BackButton from '../../components/BackButton';
import { BiteShareContext } from '../../BiteShareContext';
import { colors } from '../../infrastructure/colors';
import { readDocSnapshotListener } from '../../../firebase/helpers/database.firebase.js';


const styles = StyleSheet.create({
  topBarContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.brand.beachLight,
    maxHeight: 60
  },
  images: {
    height: 30,
    width: 30,
  },
  activeImages: {
    height: 30,
    width: 30,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  tabs: {
    flex: 1,
    flexGrow: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  backButton: {
    flexGrow: 1,
  },
  tabsImages: {
    alignItems: 'center',
  }
});



const CurrentSessionTopNavBar = ({ changeTab, currentTab }) => {
  const { state: { accountType, sessionId, splitMethod }, dispatch } = useContext(BiteShareContext);
  const [bills, setBills] = useState('Bills');
  const [menu, setMenu] = useState('Menu');
  const [qrCode, setQrCode] = useState('QR Code');
  const [summary, setSummary] = useState('Summary');
  const [hasSplitMethod, setHasSplitMethod] = useState(false);

  const handleTabRouting = (val) => {
    changeTab(val);
  };

  useEffect(() => {
    if (sessionId) {
      readDocSnapshotListener('transactions', sessionId, (doc) => {
        if (doc.data()) {
          dispatch({ type: 'SET_SPLIT_METHOD', splitMethod: doc.data().splitMethod });
        }
      });
    }
  }, [sessionId]);

  useEffect(() => {
    if (splitMethod !== '') {
      setHasSplitMethod(true);
    }
  }, [splitMethod]);

  return (
    <View style={styles.topBarContainer}>
      <View style={styles.backButton}>
        <BackButton screenName="Explore" />
      </View>
      <View style={styles.tabs}>
        <View>
          <TouchableOpacity onPress={() => handleTabRouting(bills)} style={styles.tabsImages} disabled={!hasSplitMethod} >
            <Image style={currentTab === 'Bills' ? [styles.activeImages, { opacity: 1 }] : [styles.images, hasSplitMethod ? { opacity: 1 } : { opacity: 0.3 }]} source={require('../../../assets/bill-image.png')} />
            <Text style={hasSplitMethod ? { opacity: 1 } : { opacity: 0.3 }}>{bills}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => handleTabRouting(menu)} style={styles.tabsImages}>
            <Image style={currentTab === 'Menu' ? styles.activeImages : styles.images} source={require('../../../assets/menu-image.png')} />
            <Text>{menu}</Text>
          </TouchableOpacity>
        </View>
        {accountType === 'HOST' && <View>
          <TouchableOpacity onPress={() => handleTabRouting(qrCode)} style={styles.tabsImages}>
            <Image style={currentTab === 'QR Code' ? styles.activeImages : styles.images} source={require('../../../assets/qr-code-image.png')} />
            <Text>{qrCode}</Text>
          </TouchableOpacity>
        </View>}
        <View>
          <TouchableOpacity onPress={() => handleTabRouting(summary)} style={styles.tabsImages}>
            <Image style={currentTab === 'Summary' ? styles.activeImages : styles.images} source={require('../../../assets/summary-image.png')} />
            <Text>{summary}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  );
};

export default CurrentSessionTopNavBar;