import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ cityName }) => {
  return (
    <View style={styles.backgroundStyle}>
      <Text style={styles.textStyle}>{cityName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'center',
  },
  backgroundStyle: {
    backgroundColor: 'lightblue',
  },
});

export default Header;
