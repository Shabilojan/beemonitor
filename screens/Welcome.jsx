import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';

const Welcome = () => {
  return (
    <ImageBackground
      source={require('../assets/Welcome.png')} // Reference local image
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.subtitle}>Honey monitor</Text>

        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={require('../assets/vector3.png')} // Reference local Google icon
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.appleButton}>
          <Image
            source={require('../assets/vector3.png')} // Reference local Apple icon
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Sign in with Apple</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#ffd700',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 28,
    color: '#ffd700',
    marginBottom: 20,
    textAlign: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4B400',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
  },
  appleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default Welcome;
