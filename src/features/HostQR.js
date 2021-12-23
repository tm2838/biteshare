import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import QRCode from 'react-native-qrcode-svg';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(243,225,210,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseText: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 20,
    paddingTop: 30,
    color: '#0B113E'
  },

});

const HostQR = () => {


  return (
    // eslint-disable-next-line no-use-before-define
    <View style={styles.container}>
      <QRCode
        value='http://google.com'
        color={'#0B113E'}
        backgroundColor={'white'}
        size={100}
        // logo={{uri: base64logo}}
        //  logo={require('../../../embed_logo_file_path')} // or logo={{uri: base64logo}}
        logoMargin={2}
        logoSize={40}
        logoBorderRadius={10}
        logoBackgroundColor={'transparent'}
      />
      {/* <MaterialCommunityIcons name="qrcode-scan" size={90} color="black" /> */}
      <Text style={styles.baseText} >
        Scan to join a session
      </Text>


    </View>

  );
};


export default HostQR;


/*

import React, { useState } from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { Font, AppLoading } from "expo";
import productsReducer from "./store/reducers/products";
import ShopNavigator from "./navigation/ShopNavigator";

const rootReducer = combineReducers({
  products: productsReducer
});

const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

*/