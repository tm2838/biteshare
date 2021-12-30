import React from 'react';
import SafeArea from './SafeArea';
import { SafeAreaView, FlatList, View, Text, StyleSheet } from 'react-native';
import { colors } from '../infrastructure/colors';

const styles = StyleSheet.create({
  container: {
    margin: 5,
    backgroundColor: colors.brand.kazanLight2,
    borderRadius: 15,
  },
  menuItemContainer: {
    padding: 20,
  },
  menuItemInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  menuItemName: {
    width: '70%',
  },
  menuItemPrice: {
    marginLeft: '18%'
  },
  menuItemDescription: {
    fontStyle: 'italic'
  }
});

const MenuItemCard = ({ menuItems }) => {
  const renderMenuItem = (menuItem) => {
    return (
      <View style={styles.menuItemContainer}>
        <View style={styles.menuItemInfoContainer}>
          <Text style={styles.menuItemName}>{menuItem.item.name}</Text>
          <Text style={styles.menuItemPrice}>{menuItem.item.pricing[0].priceString}</Text>
        </View>
        <Text style={styles.menuItemDescription}>{menuItem.item.description}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={menu => menu.name}
      />
    </SafeAreaView>
  );
};

export default MenuItemCard;