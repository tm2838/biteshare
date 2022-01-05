import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, FlatList } from 'react-native';
import { colors } from '../../../infrastructure/colors.js';
import { BiteShareContext } from '../../../BiteShareContext.js';

const styles = StyleSheet.create({
  orderedItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});


const OrderedItemInfo = ({ orderedItem }) => {
  return (
    <View>
      <View style={styles.orderedItem}>
        <View style={{ width: 200 }}>
          <Text style={{ fontWeight: 'bold' }}>{orderedItem.name}</Text>

        </View>
        <Text style={{ fontWeight: 'bold' }}>${orderedItem.price}</Text>
      </View>
      <Text>{orderedItem.description}</Text>
    </View>
  );
};

export default OrderedItemInfo;