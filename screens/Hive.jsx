import React, { useState } from 'react';
import { View, Text,Image, TextInput, Alert, ScrollView, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import axios from 'axios';

const Hive = ({ navigation }) => {
    const [hive, setHive] = useState(null);
    const [hiveNo, setHiveNo] = useState('');
    const [searched, setSearched] = useState(false);
    const [message, setMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [isCreating, setIsCreating] = useState(false);
    const [newHive, setNewHive] = useState({
        hiveNo: '',
        humidity: '',
        temperature: '',
        beeInOut: '',
        raindrops: '',
        expectedHarvestDate: '',
        honeyLevel: '',
    });

    const fetchHiveDetails = () => {
        axios.get(`http://192.168.85.173:5000/hive-details?hiveNo=${hiveNo}`)
            .then(response => {
                if (response.data.success) {
                    setHive(response.data.data);
                    setEditData(response.data.data);
                    setMessage('');
                } else {
                    setHive(null);
                    setMessage('No hive details found.');
                }
            })
            .catch(error => {
                setHive(null);
                setMessage('Error fetching hive details');
            });
    };

    const handleSearch = () => {
        if (hiveNo) {
            setSearched(true);
            fetchHiveDetails();
        }
    };

    const handleClear = () => {
        setHive(null);
        setHiveNo('');
        setSearched(false);
        setMessage('');
        setIsEditing(false);
        setIsCreating(false);
    };

    const handleDelete = () => {
        Alert.alert('Delete Confirmation', `Are you sure you want to delete Hive #${hiveNo}?`, [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Delete',
                onPress: () => {
                    axios.delete(`http://192.168.85.173:5000/hive-details?hiveNo=${hiveNo}`)
                        .then(() => {
                            setMessage(`Hive #${hiveNo} has been deleted.`);
                            setHive(null);
                            setSearched(false);
                            setHiveNo('');
                            setIsEditing(false);
                        })
                        .catch(() => {
                            setMessage('Failed to delete hive.');
                        });
                },
            },
        ]);
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleEditInputChange = (name, value) => {
        setEditData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleUpdate = () => {
        axios.put(`http://192.168.85.173:5000/hive-details`, editData)
            .then(() => {
                setMessage(`Hive #${editData.hiveNo} has been updated.`);
                setIsEditing(false);
                fetchHiveDetails();
            })
            .catch(() => {
                setMessage('Failed to update hive.');
            });
    };

    const handleCreateToggle = () => {
        setIsCreating(!isCreating);
        setNewHive({
            hiveNo: '',
            humidity: '',
            temperature: '',
            beeInOut: '',
            raindrops: '',
            expectedHarvestDate: '',
            honeyLevel: '',
        });
    };

    const handleCreateInputChange = (name, value) => {
        setNewHive(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validateInputs = () => {
        const { hiveNo, expectedHarvestDate, temperature, honeyLevel } = newHive;
        const currentDate = new Date();

        if (!hiveNo) {
            setMessage('Hive number is required.');
            return false;
        }

        if (new Date(expectedHarvestDate) <= currentDate) {
            setMessage('Expected harvest date must be a future date.');
            return false;
        }

        if (temperature < 0 || temperature > 100) {
            setMessage('Temperature must be between 0 and 100.');
            return false;
        }

        if (honeyLevel < 0 || honeyLevel > 100) {
            setMessage('Honey level must be between 0 and 100.');
            return false;
        }

        return true;
    };

    const handleCreate = () => {
        if (validateInputs()) {
            axios.post('http://192.168.85.173:5000/hive-details', newHive)
                .then(() => {
                    setMessage(`Hive #${newHive.hiveNo} has been created.`);
                    setIsCreating(false);
                    setHive(null);
                    setHiveNo('');
                })
                .catch(() => {
                    setMessage('hive number already exits.');
                });
        }
    };

    return (
        <ImageBackground 
            source={require('../assets/Bg-02.png')} 
            style={styles.background}
        >
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Text style={styles.title}>Hive Details</Text>
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Hive Number"
                            keyboardType="numeric"
                            value={hiveNo}
                            onChangeText={setHiveNo}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleSearch}>
                            <Text style={styles.buttonText}>Search</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleClear}>
                            <Text style={styles.buttonText}>Clear</Text>
                        </TouchableOpacity>
                        {!isCreating && (
                            <TouchableOpacity style={styles.button} onPress={handleCreateToggle}>
                                <Text style={styles.buttonText}>Create Hive</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {message ? <Text style={styles.message}>{message}</Text> : null}

                    {searched && hive && !isEditing && (
                        <View style={styles.hiveCard}>
                            <Text style={styles.hiveTitle}>Hive #{hive.hiveNo}</Text>
                            <Text style={styles.hiveText}>Humidity: {hive.humidity}</Text>
                            <Text style={styles.hiveText}>Temperature: {hive.temperature}</Text>
                            <Text style={styles.hiveText}>Bee In/Out: {hive.beeInOut}</Text>
                            <Text style={styles.hiveText}>Raindrops: {hive.raindrops}</Text>
                            <Text style={styles.hiveText}>Expected Harvest Date: {new Date(hive.expectedHarvestDate).toLocaleDateString()}</Text>
                            <Text style={styles.hiveText}>Honey Level: {hive.honeyLevel}</Text>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={handleEditToggle}>
                                    <Text style={styles.buttonText}>Edit Hive</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={handleDelete}>
                                    <Text style={styles.buttonText}>Delete Hive</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {isEditing && (
                        <View style={styles.hiveCard}>
                            <Text style={styles.hiveTitle}>Edit Hive #{editData.hiveNo}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Humidity"
                                value={editData.humidity}
                                onChangeText={(value) => handleEditInputChange('humidity', value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Temperature"
                                value={editData.temperature}
                                onChangeText={(value) => handleEditInputChange('temperature', value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Bee In/Out"
                                value={editData.beeInOut}
                                onChangeText={(value) => handleEditInputChange('beeInOut', value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Raindrops"
                                value={editData.raindrops}
                                onChangeText={(value) => handleEditInputChange('raindrops', value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Expected Harvest Date (YYYY-MM-DD)"
                                value={editData.expectedHarvestDate}
                                onChangeText={(value) => handleEditInputChange('expectedHarvestDate', value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Honey Level"
                                value={editData.honeyLevel}
                                onChangeText={(value) => handleEditInputChange('honeyLevel', value)}
                            />
                            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                                <Text style={styles.buttonText}>Update Hive</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {isCreating && (
                        <View style={styles.hiveCard}>
                            <Text style={styles.hiveTitle}>Create New Hive</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Hive Number"
                                value={newHive.hiveNo}
                                onChangeText={(value) => handleCreateInputChange('hiveNo', value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Humidity"
                                value={newHive.humidity}
                                onChangeText={(value) => handleCreateInputChange('humidity', value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Temperature"
                                value={newHive.temperature}
                                onChangeText={(value) => handleCreateInputChange('temperature', value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Bee In/Out"
                                value={newHive.beeInOut}
                                onChangeText={(value) => handleCreateInputChange('beeInOut', value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Raindrops"
                                value={newHive.raindrops}
                                onChangeText={(value) => handleCreateInputChange('raindrops', value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Expected Harvest Date (YYYY-MM-DD)"
                                value={newHive.expectedHarvestDate}
                                onChangeText={(value) => handleCreateInputChange('expectedHarvestDate', value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Honey Level"
                                value={newHive.honeyLevel}
                                onChangeText={(value) => handleCreateInputChange('honeyLevel', value)}
                            />
                            <TouchableOpacity style={styles.button} onPress={handleCreate}>
                                <Text style={styles.buttonText}>Create Hive</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate('Hive')} style={styles.footerItem}>
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
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        padding: 16,
      
    },
  
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black',
    },

    searchBar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
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
    message: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
    hiveCard: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 20,
        width: '100%',
    },
    hiveTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    hiveText: {
        marginBottom: 5,
        marginBottom: 5,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding:15,
        marginBottom:20,
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

export default Hive;
