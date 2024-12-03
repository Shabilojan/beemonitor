import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  ImageBackground, 
  ScrollView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const Dashboard = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const fetchWeather = async () => {
    setLoading(true);
    setWeatherData(null);
    try {
      const response = await fetch(`http://192.168.85.173:5000/weather/${city}`);
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
      source={require('../assets/Bg-02.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Weather Dashboard</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter city"
            placeholderTextColor="#aaa"
            value={city}
            onChangeText={setCity}
          />
          <TouchableOpacity style={styles.getWeatherButton} onPress={fetchWeather}>
            <Text style={styles.getWeatherButtonText}>Get Weather</Text>
          </TouchableOpacity>

          {loading && <ActivityIndicator size="large" color="#fff" style={styles.loader} />}

          {weatherData && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Weather Information</Text>
              <Text style={styles.info}>City: {weatherData.city}</Text>
              <Text style={styles.info}>Temperature: {weatherData.temperature}°C</Text>
              <Text style={styles.info}>Weather: {weatherData.weather}</Text>
              <Text style={styles.info}>Humidity: {weatherData.humidity}%</Text>
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate('Hive')}>
              <Text style={styles.cardButtonText}>Hive Management</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate('User')}>
              <Text style={styles.cardButtonText}>User Management</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: '#000',
  },
  getWeatherButton: {
    backgroundColor: '#2196f3',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  getWeatherButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 10,
  },
  card: {
    width: '100%',
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '100%',
  },
  cardButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#ffcc80',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  cardButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Dashboard;
