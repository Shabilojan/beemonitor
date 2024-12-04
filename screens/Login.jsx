import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Image,
} from 'react-native';
import axios from 'axios';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  const handleLogin = async () => {
    setIsLoading(true); // Set loading to true before the request

    try {
      const response = await axios.post('http://192.168.228.173:5000/login', {
        username,
        password,
      });

      if (response.data.success) {
        Alert.alert('Login Successful', 'Welcome!');
        navigation.navigate('Dashboard'); // Navigate to Dashboard if login is successful
      } else {
        Alert.alert('Login Failed', response.data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong!');
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading back to false after response/error
    }
  };

  return (
    <ImageBackground
      source={require('../assets/Bg-02.png')} // Replace with the actual path to your image
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {isLoading ? ( // Conditionally render loading indicator
          <ActivityIndicator size="large" color="#0000ff" />
        ) : ( // Render login form when not loading
          <View style={styles.content}>
            <Image style={styles.logo} source={require('../assets/4.png')} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#aaa"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: adds a translucent overlay
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.25)', // Semi-transparent white
    borderRadius: 5,
    width: '90%',
    color: '#000', // Ensure text is visible on transparent background
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 20,
    marginBottom: 20, 
  },
  button: {
    marginTop:20,
    backgroundColor: '#ffa500', 
    padding: 10,
    width: '40%',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Login;
