import { View, Text } from 'react-native';

const WeatherIcon = ({ weatherType }) => {
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return '☀️';
      case 'Clouds':
        return '☁️';
      case 'Rain':
        return '🌧️';
      case 'Snow':
        return '❄️';
      case 'Mist':
        return '🌫️';
      default:
        return '❓';
    }
  };

  const icon = getWeatherIcon(weatherType);

  return (
    <View>
      <Text style={{ fontSize: 30 }}>{icon}</Text>
    </View>
  );
};

export default WeatherIcon;
