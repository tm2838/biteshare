// import React, { useState, useEffect, useContext } from 'react';
// import { Platform, Text, View, StyleSheet } from 'react-native';

// import { BiteShareContext } from '../../BiteShareContext.js';
// import * as Location from 'expo-location';

// // const styles = StyleSheet.create({
// //   container: {

// //   },
// //   paragraph: {

// //   }
// // });

// const getLocation = async () => {
//   // const [location, setLocation] = useState('Waiting...');
//   // const [errorMsg, setErrorMsg] = useState(null);
//   const { state: { currentZip }, dispatch } = useContext(BiteShareContext);

//   let { status } = await Location.requestForegroundPermissionsAsync();
//   if (status !== 'granted') {
//     // setErrorMsg('Permission to access location was denied');
//     return;
//   }
//   let location = await Location.getCurrentPositionAsync({});
//   let longitude = location.coords.longitude;
//   let latitude = location.coords.latitude;
//   let address = await Location.reverseGeocodeAsync({ latitude, longitude });
//   // console.log(address[0]);
//   dispatch({ type: 'SET_CURRENTZIP', currentZip: address[0].postalCode });

//   // useEffect(() => {
//   //   (async () => {
//   //     let { status } = await Location.requestForegroundPermissionsAsync();
//   //     if (status !== 'granted') {
//   //       // setErrorMsg('Permission to access location was denied');
//   //       return;
//   //     }
//   //     let location = await Location.getCurrentPositionAsync({});
//   //     let longitude = location.coords.longitude;
//   //     let latitude = location.coords.latitude;
//   //     let address = await Location.reverseGeocodeAsync({ latitude, longitude });
//   //     // console.log(address[0]);
//   //     dispatch({ type: 'SET_CURRENTZIP', currentZip: address[0].postalCode});
//   //     // setLocation(address[0].postalCode);
//   //   })();
//   // }, []);

//   // let text = 'Waiting..';
//   // if (location) {
//   //   text = lo;
//   // } else if (location) {
//   //   text = JSON.stringify(location);
//   // }

//   // return (
//   //   <>
//   //     {location &&
//   //       <View style={styles.container}>
//   //         <Text style={styles.paragraph}>{text}</Text>
//   //       </View>
//   //     }
//   //   </>
//   // );
// };

// // export default getLocation;