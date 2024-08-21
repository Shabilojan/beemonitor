import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ImageBackground } from 'react-native';

const Home = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground style={styles.container} source={require('./screens/Bg.png')}>
      <View style={styles.darkOverlay} />
      <View style={styles.content}>
        <Image style={styles.logo} source={require('./screens/Logo.png')} />
        <ActivityIndicator size="large" color="#00ff00" style={styles.activityIndicator} />
        <View style={styles.textView}>
          <Text style={styles.text}>Powered By</Text>
          <Text style={styles.marginTop20}>Techno brain</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 400,
    height: 600,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  activityIndicator: {
    marginTop: 10,
  },
  textView: {
    marginTop: 80,
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
