import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ImageBackground } from 'react-native';

const Home = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (navigation && typeof navigation.navigate === 'function') {
        navigation.navigate('Menu');
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground style={styles.container} source={require('../assets/1.png')}>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Image style={styles.logo} source={require('../assets/3.png')} />
          <ActivityIndicator size="large" color="#00ff00" style={styles.activityIndicator} />
          <View style={styles.textView}>
            <Text style={styles.text}>Powered By</Text>
            <Text style={styles.marginTop20}>Techno brain</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 400, 
    height: 400, 
  },
  activityIndicator: {
    marginTop: 50, 
  },
  textView: {
    marginTop: 180, 
    alignItems: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 25,
  },
  marginTop20: {
    marginTop: 5,
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    fontWeight: '200',
  },
});

export default Home;
