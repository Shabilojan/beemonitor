import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Hive = () => {
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
    const [userRole, setUserRole] = useState('');

    // Fetch user role from AsyncStorage
    useEffect(() => {
        const fetchUserRole = async () => {
            const role = await AsyncStorage.getItem('role');
            setUserRole(role);
        };
        fetchUserRole();
    }, []);

    // Fetch hive details
    const fetchHiveDetails = () => {
        console.log(`Fetching hive details for hiveNo: ${hiveNo}`);
        axios.get(`http://10.0.2.2:3000/hive-details?hiveNo=${hiveNo}`) // Use the correct IP address
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
        axios.put(`http://10.0.2.2:3000/hive-details`, editData)
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
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Hive Details</Text>

            <View style={styles.searchBar}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Hive Number"
                    keyboardType="numeric"
                    value={hiveNo}
                    onChangeText={setHiveNo}
                />
                <Button title="Search" onPress={handleSearch} />
                <Button title="Clear" onPress={handleClear} />
                {userRole === 'Admin' && (
                    <Button title={isCreating ? 'Cancel' : 'Create Hive'} onPress={handleCreateToggle} />
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

                    {userRole === 'Admin' && (
                        <>
                            <Button title="Delete Hive" onPress={handleDelete} />
                            <Button title="Edit Hive" onPress={handleEditToggle} />
                        </>
                    )}
                </View>
            )}

            {isEditing && (
                <View style={styles.hiveCard}>
                    <Text style={styles.hiveTitle}>Edit Hive #{editData.hiveNo}</Text>
                    {/* Add Input fields for Editing */}
                </View>
            )}

            {isCreating && userRole === 'Admin' && (
                <View style={styles.hiveCard}>
                    {/* Add Input fields for Creating */}
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#000',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#fff',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        flex: 1,
        marginRight: 8,
        color: '#fff', // Ensures text inside TextInput is visible
    },
    message: {
        color: 'red',
        marginBottom: 16,
    },
    hiveCard: {
        backgroundColor: '#333', // Ensure card background contrasts with text
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        elevation: 3,
    },
    hiveTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#fff',
    },
    hiveText: {
        color: '#fff', // Ensure text color is white for visibility
    },
});

export default Hive;
