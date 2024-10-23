import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

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

    // Fetch hive details
    const fetchHiveDetails = () => {
        console.log(`Fetching hive details for hiveNo: ${hiveNo}`);
        axios.get(`http://10.0.2.2:3000/hive-details?hiveNo=${hiveNo}`)
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
                    axios.delete(`http://10.0.2.2:3000/hive-details?hiveNo=${hiveNo}`)
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
        axios.post('http://10.0.2.2:3000/hive-details', newHive)
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
                {!isCreating && (
                    <Button title="Create Hive" onPress={handleCreateToggle} />
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

                    <View style={styles.actionButtons}>
                        <Button title="Edit Hive" onPress={handleEditToggle} />
                        <Button title="Delete Hive" onPress={handleDelete} />
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
                    <Button title="Update Hive" onPress={handleUpdate} />
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
                    <Button title="Create Hive" onPress={handleCreate} />
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#000',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        flex: 1,
        marginRight: 10,
        backgroundColor: '#000',
    },
    hiveCard: {
        padding: 20,
        backgroundColor: '#010101',
        marginBottom: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    hiveTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    hiveText: {
        fontSize: 16,
        marginBottom: 5,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    message: {
        fontSize: 16,
        color: 'red',
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default Hive;
