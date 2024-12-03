import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, ImageBackground,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const Dashboard = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation(); // Access navigation object

  const fetchWeather = async () => {
    setLoading(true);
    setWeatherData(null);
    try {
      const response = await fetch(`http://192.168.85.173:5000/weather/${city}`); // Replace with your IP
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
                                <TouchableOpacity style={styles.button} onPress={() =>  navigation.navigate('Hive')}>
                                    <Text style={styles.buttonText}>Hive management</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() =>  navigation.navigate('User')}>
                                    <Text style={styles.buttonText}>User management</Text>
                                </TouchableOpacity>
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
    color: '#000',
    
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
},
button: {
    backgroundColor: '#ffcc80',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
},
buttonText: {
    color: 'white',
    fontWeight: 'bold',
},
});

export default Dashboard;
