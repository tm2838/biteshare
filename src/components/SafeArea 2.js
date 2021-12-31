import React from 'react';
import { SafeAreaView } from 'react-native';

const SafeArea = ({children}) => {
  return (
    <SafeAreaView>
      {children}
    </SafeAreaView>
  );
};

export default SafeArea;