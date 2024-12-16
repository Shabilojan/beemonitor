import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const Dashboard = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const buttons = [
    {
      id: 1,
      image: require('../assets/beekeeper.jpg'),
      text: 'Hive Management',
      navigateTo: 'Hive',
    },
    {
      id: 2,
      image: require('../assets/user.jpeg'),
      text: 'User Management',
      navigateTo: 'User',
    },
    {
      id: 3,
      image: require('../assets/beefarming.jpeg'),
      text: 'Bee Farming',
      navigateTo: 'Beefarming',
    },
  ];

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / (width * 0.6));
    setActiveIndex(index);
  };

  const fetchWeather = async () => {
    setLoading(true);
    setWeatherData(null);
    try {
      const response = await fetch(`http://192.168.161.173:5000/weather/${city}`);
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
  const handleLogout = async () => {
    try {
        // Remove the JWT token and role from AsyncStorage
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('role');
        navigation.navigate('Login'); // This ensures the navigation works correctly
    } catch (error) {
        console.error('Error during logout:', error);
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/Bg-02.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.getWeatherButtonText}>Logout</Text>
            </TouchableOpacity>
           
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

            {/* Dashboard Section */}
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled={false}
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              contentContainerStyle={styles.carouselContainer}
              snapToInterval={width * 0.6}
              decelerationRate="fast"
            >
              {buttons.map((button, index) => (
                <View
                  key={button.id}
                  style={[
                    styles.buttonWrapper,
                    activeIndex === index ? styles.activeButtonWrapper : null,
                  ]}
                >
                  <TouchableOpacity
                    style={styles.cardButton}
                    onPress={() => navigation.navigate(button.navigateTo)}
                  >
                    <Image source={button.image} style={styles.cardButtonImage} />
                    <View style={styles.cardOverlay}>
                      <Text style={styles.cardButtonText}>{button.text}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.navigate('Hive')} style={styles.footerItem}>
                    <Image source={require('../assets/Vector.png')} style={styles.icon} />
                    <Text style={styles.footerText}>HIVE</Text>
                </TouchableOpacity>

                 
                <View style={styles.iconWrapper}>
                <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.footerItem}>
                    <Image source={require('../assets/vector3.png')} style={styles.roundIcon} />
                    <Text style={styles.centeredText}>Dashboard</Text>
                    </TouchableOpacity>
                </View>
               
                
                <TouchableOpacity onPress={() => navigation.navigate('HoneyStatic')} style={styles.footerItem}>
                    <Image source={require('../assets/vector2.png')} style={styles.icon} />
                    <Text style={styles.footerText}>Honey Bar</Text>
                </TouchableOpacity>
  </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingHorizontal: (width * 0.2) / 2,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginTop: 20,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginVertical: 15,
    backgroundColor: '#ffa500',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: '82%',
  },
  input: {
    marginTop: 20,
    width: 300,
    height:40,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    marginBottom: 20,
    color:'#fff',
  },
  getWeatherButton: {
    backgroundColor: '#ffa500',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  getWeatherButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 20,
  },
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 30,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    width:300,

  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginVertical: 2,
  },
  carouselContainer: {
    marginTop:40,
    alignItems: 'center',
    paddingHorizontal: (width * 0.2) / 2,
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20, // Adjust this value for space between images
    width: width * 0.5,
  },
  activeButtonWrapper: {
    transform: [{ scale: 1.1 }],
  },
  cardButton: {
    width: '100%',
    height: width / 2.5,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardOverlay: {
    
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  cardButtonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffd54f',
    width: '101%',
    height: 80,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: -2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 40,
},
footerItem: {
    alignItems: 'center',
},
icon: {
    width: 35,
    height: 35,
},
roundIcon: {
    marginHorizontal: 170,
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#000',
    marginBottom: 12,
    backgroundColor: '#ffd54f',
},
iconWrapper: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    justifyContent: 'center',
},
centeredText: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 2,
},
footerText: {
    marginTop: 5,
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
},
});

export default Dashboard;
