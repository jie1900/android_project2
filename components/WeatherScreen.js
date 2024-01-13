import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Header from './Header';
import Temperature from './Temperature';
import WindSpeed from './WindSpeed';
import LocationInput from './LocationInput';
import WeatherIcon from './Weathericon';

const App = () => {
  const [cityName, setCityName] = useState('Tampere');
  const [temperature, setTemperature] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [weatherType, setWeatherType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = '59d1e7067a27b20afbb0d100cef22db7';
  const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  useEffect(() => {
    handleRefresh(cityName); // Fetch weather data for Tampere when the component mounts
  }, []);

  const handleRefresh = async (city) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${API_BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      setTemperature(data.main.temp);
      setWindSpeed(data.wind.speed);
      setWeatherType(data.weather[0].main);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (newCity) => {
    setCityName(newCity);
    handleRefresh(newCity); // Pass the new city name directly to handleRefresh
  };

  return (
    <View style={styles.container}>
      <LocationInput onLocationChange={handleCityChange} />
      <Header cityName={cityName} />
      {loading && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}
      {weatherType && <WeatherIcon weatherType={weatherType} />}
      {temperature !== null && <Temperature value={temperature} />}
      {windSpeed !== null && <WindSpeed value={windSpeed} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
