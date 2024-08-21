import React from 'react';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity, Image } from 'react-native';

const Menu = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/Bg-02.png')} style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <Text style={styles.title}>Welcome to Honey World</Text>
          
          <Image source={require('../assets/2.png')} style={styles.menuIcon} />
          
          <Text style={styles.menuText}>
            Monitor your hives' health and productivity in real-time with IoT Technology
          </Text>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sinhala')}>
            <Text style={styles.buttonText}>Get started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 40,
    borderRadius: 15,
    alignItems: 'center',
    width: '90%',
    height:'80%',
    maxWidth: 400,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  menuIcon: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  menuText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#f4a261',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Menu;
