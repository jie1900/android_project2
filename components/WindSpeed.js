import { View, Text } from 'react-native';

const WindSpeed = ({ value }) => {
  return (
    <View>
      <Text>Wind Speed: {value} m/s</Text>
    </View>
  );
};

export default WindSpeed;