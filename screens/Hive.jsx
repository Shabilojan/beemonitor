import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ScrollView, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
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

    // Fetch hive details
    const fetchHiveDetails = () => {
        console.log(`Fetching hive details for hiveNo: ${hiveNo}`);
        axios.get(`http://10.0.2.2:5000/hive-details?hiveNo=${hiveNo}`)
            .then(response => {
                console.log('Response received:', response.data);
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
                console.log('Error fetching hive details:', error);
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
                    axios.delete(`http://10.0.2.2:5000/hive-details?hiveNo=${hiveNo}`)
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
        axios.put(`http://10.0.2.2:5000/hive-details`, editData)
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

    const handleCreate = () => {
        axios.post('http://10.0.2.2:5000/hive-details', newHive)
            .then(() => {
                setMessage(`Hive #${newHive.hiveNo} has been created.`);
                setIsCreating(false);
                setHive(null);
                setHiveNo('');
            })
            .catch(() => {
                setMessage('Failed to create hive.');
            });
    };

    return (
        <ImageBackground 
            source={require('../assets/Bg-02.png')} // Add your background image here
            style={styles.background}
        >
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Text style={styles.title}>Hive Details</Text>

                    {/* Centered Search Bar */}
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Hive Number"
                            keyboardType="numeric"
                            value={hiveNo}
                            onChangeText={setHiveNo}
                        />
                    </View>

                    {/* Action Buttons */}
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
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    searchContainer: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    message: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 20,
    },
    hiveCard: {
        padding: 20,
        backgroundColor: '#A9A9A9',
        borderRadius: 15,
        elevation: 2,
        marginBottom: 20,
    },
    hiveTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    hiveText: {
        color:'#000',
        marginBottom: 5,
    },
});

export default Hive;
