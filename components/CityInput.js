import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const CityInput = ({ onCityChange }) => {
  const [city, setCity] = useState('');

  const handleInputChange = (text) => {
    setCity(text);
  };

  const handleUpdate = () => {
    onCityChange(city);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter City/Location"
        value={city}
        onChangeText={handleInputChange}
      />
      <Button title="Update" onPress={handleUpdate} />
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

export default CityInput;
