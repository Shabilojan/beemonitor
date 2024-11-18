import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';

const Dashboard = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    setWeatherData(null);
    try {
      const response = await fetch(`http://10.0.2.2:5000/weather/${city}`); // Replace with your IP
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error ${response.status}: ${errorText}`);
        alert(`Error: ${response.statusText}`);
      } else {
        const data = await response.json();
        setWeatherData(data);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/Bg-02.png')} // Replace with your image path
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Weather Dashboard</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter city"
          value={city}
          onChangeText={setCity}
        />
        <Button title="Get Weather" onPress={fetchWeather} />

        {loading && <ActivityIndicator size="large" color="#fff" />}

        {weatherData && (
          <View style={styles.weatherContainer}>
            <Text style={styles.info}>City: {weatherData.city}</Text>
            <Text style={styles.info}>Temperature: {weatherData.temperature}°C</Text>
            <Text style={styles.info}>Weather: {weatherData.weather}</Text>
            <Text style={styles.info}>Humidity: {weatherData.humidity}%</Text>

            {/* Buttons below the weather data */}
            <View style={styles.buttonContainer}>
              <Button title="Button 1" onPress={() => alert('Button 1 clicked')} />
              <Button title="Button 2" onPress={() => alert('Button 2 clicked')} />
              <Button title="Button 3" onPress={() => alert('Button 3 clicked')} />
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#fff',
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
    color: '#fff',
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});

export default Dashboard;
