import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Image, TextInput, Alert } from 'react-native';

const Boxcode = ({ navigation }) => {
    const [boxCode, setBoxCode] = useState(''); 

    const handleSubmit = () => {
        if (boxCode.length === 4) {
            Alert.alert('Box Code Entered', `Box Code: ${boxCode}`);
        } else {
            Alert.alert('Invalid Code', 'Please enter a 4-digit code');
        }
    };

    return (
        <ImageBackground
            source={require('../assets/hive.png')}
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Enter your box code</Text>
                
                <TextInput
                    style={styles.input}
                    placeholder="Enter 4-digit box code"
                    keyboardType="numeric"
                    maxLength={4}
                    value={boxCode}
                    onChangeText={setBoxCode}
                />
                
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Submit Box Code</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate('HiveScreen')} style={styles.footerItem}>
                    <Image source={require('../assets/Vector.png')} style={styles.icon} />
                    <Text style={styles.footerText}>HIVE</Text>
                </TouchableOpacity>
                
                <View style={styles.iconWrapper}>
                    <Image source={require('../assets/vector3.png')} style={styles.roundIcon} />
                    <Text style={styles.centeredText}>Dashboard</Text>
                </View>
                
                <TouchableOpacity onPress={() => navigation.navigate('HoneyBarScreen')} style={styles.footerItem}>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },
    title: {
        fontSize: 26,
        color: '#fff',
        marginBottom: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    input: {
        backgroundColor: '#fff',
        width: '70%',
        padding: 10,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 20,
        elevation: 5,
        color: '#000', 
    },
    button: {
        backgroundColor: '#ffcc80',
        padding: 15,
        borderRadius: 20,
        marginVertical: 10,
        width: '70%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    buttonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffd54f',
        width: '100%',
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

export default Boxcode;
