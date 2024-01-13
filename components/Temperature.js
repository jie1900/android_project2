import { View, Text } from 'react-native';

const Temperature = ({ value }) => {
  return (
    <View>
      <Text>Temperature: {value} °C</Text>
    </View>
  );
};

export default Temperature;
