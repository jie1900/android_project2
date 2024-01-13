import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const LocationInput = ({ onLocationChange }) => {
  const [location, setLocation] = useState('');

  const handleInputChange = (text) => {
    setLocation(text);
  };

  const handleSearch = () => {
    onLocationChange(location);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter City/Location"
        value={location}
        onChangeText={handleInputChange}
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    paddingHorizontal: 8,
  },
});

export default LocationInput;
