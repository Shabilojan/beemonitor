import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

const User = () => {
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState('');
    const [searched, setSearched] = useState(false);
    const [message, setMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [isCreating, setIsCreating] = useState(false);
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        role: '',
    });

    // Fetch user details
    const fetchUserDetails = () => {
        console.log(`Fetching user details for userId: ${userId}`);
        axios.get(`http://10.0.2.2:3000/user-details?userId=${userId}`)
            .then(response => {
                console.log('Response received:', response.data);
                if (response.data.success) {
                    setUser(response.data.data);
                    setEditData(response.data.data);
                    setMessage('');
                } else {
                    setUser(null);
                    setMessage('No user details found.');
                }
            })
            .catch(error => {
                console.log('Error fetching user details:', error);
                setUser(null);
                setMessage('Error fetching user details');
            });
    };

    const handleSearch = () => {
        if (userId) {
            setSearched(true);
            fetchUserDetails();
        }
    };

    const handleClear = () => {
        setUser(null);
        setUserId('');
        setSearched(false);
        setMessage('');
        setIsEditing(false);
        setIsCreating(false);
    };

    const handleDelete = () => {
        Alert.alert('Delete Confirmation', `Are you sure you want to delete User #${userId}?`, [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Delete',
                onPress: () => {
                    axios.delete(`http://10.0.2.2:3000/user-details?userId=${userId}`)
                        .then(() => {
                            setMessage(`User #${userId} has been deleted.`);
                            setUser(null);
                            setSearched(false);
                            setUserId('');
                            setIsEditing(false);
                        })
                        .catch(() => {
                            setMessage('Failed to delete user.');
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
        axios.put(`http://10.0.2.2:3000/user-details`, editData)
            .then(() => {
                setMessage(`User #${editData.userId} has been updated.`);
                setIsEditing(false);
                fetchUserDetails();
            })
            .catch(() => {
                setMessage('Failed to update user.');
            });
    };

    const handleCreateToggle = () => {
        setIsCreating(!isCreating);
        setNewUser({
            username: '',
            email: '',
            role: '',
        });
    };

    const handleCreateInputChange = (name, value) => {
        setNewUser(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCreate = () => {
        axios.post('http://10.0.2.2:3000/user-details', newUser)
            .then(() => {
                setMessage(`User #${newUser.username} has been created.`);
                setIsCreating(false);
                setUser(null);
                setUserId('');
            })
            .catch(() => {
                setMessage('Failed to create user.');
            });
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>User Details</Text>

            <View style={styles.searchBar}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter User ID"
                    keyboardType="numeric"
                    value={userId}
                    onChangeText={setUserId}
                />
                <Button title="Search" onPress={handleSearch} />
                <Button title="Clear" onPress={handleClear} />
                {!isCreating && (
                    <Button title="Create User" onPress={handleCreateToggle} />
                )}
            </View>

            {message ? <Text style={styles.message}>{message}</Text> : null}

            {searched && user && !isEditing && (
                <View style={styles.userCard}>
                    <Text style={styles.userTitle}>User #{user.userId}</Text>
                    <Text style={styles.userText}>Username: {user.username}</Text>
                    <Text style={styles.userText}>Email: {user.email}</Text>
                    <Text style={styles.userText}>Role: {user.role}</Text>

                    <View style={styles.actionButtons}>
                        <Button title="Edit User" onPress={handleEditToggle} />
                        <Button title="Delete User" onPress={handleDelete} />
                    </View>
                </View>
            )}

            {isEditing && (
                <View style={styles.userCard}>
                    <Text style={styles.userTitle}>Edit User #{editData.userId}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={editData.username}
                        onChangeText={(value) => handleEditInputChange('username', value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={editData.email}
                        onChangeText={(value) => handleEditInputChange('email', value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Role"
                        value={editData.role}
                        onChangeText={(value) => handleEditInputChange('role', value)}
                    />
                    <Button title="Update User" onPress={handleUpdate} />
                </View>
            )}

            {isCreating && (
                <View style={styles.userCard}>
                    <Text style={styles.userTitle}>Create New User</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={newUser.username}
                        onChangeText={(value) => handleCreateInputChange('username', value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={newUser.email}
                        onChangeText={(value) => handleCreateInputChange('email', value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Role"
                        value={newUser.role}
                        onChangeText={(value) => handleCreateInputChange('role', value)}
                    />
                    <Button title="Create User" onPress={handleCreate} />
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
    userCard: {
        padding: 20,
        backgroundColor: '#010101',
        marginBottom: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    userTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    userText: {
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

export default User;
