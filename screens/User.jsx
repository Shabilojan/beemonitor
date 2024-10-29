import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import axios from 'axios';

const User = ({ navigation }) => {  // Ensure you receive 'navigation' prop
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState('');
    const [searched, setSearched] = useState(false);
    const [message, setMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [isCreating, setIsCreating] = useState(false);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        profilePicture: '',
        username: '',
        role: '',
    });

    // Fetch user details
    const fetchUserDetails = () => {
        axios.get(`http://10.0.2.2:5000/user-details/${userId}`)
            .then(response => {
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
                    axios.delete(`http://10.0.2.2:5000/user-details/${userId}`)
                        .then(() => {
                            setMessage(`User #${userId} has been deleted.`);
                            handleClear();
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
        axios.put(`http://10.0.2.2:5000/user-details/${userId}`, editData)
            .then(() => {
                setMessage(`User #${userId} has been updated.`);
                fetchUserDetails();
                setIsEditing(false);
            })
            .catch(() => {
                setMessage('Failed to update user.');
            });
    };

    const handleCreateToggle = () => {
        setIsCreating(!isCreating);
        setNewUser({
            name: '',
            email: '',
            phoneNumber: '',
            password: '',
            profilePicture: '',
            username: '',
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
        axios.post(`http://10.0.2.2:5000/user-details`, newUser)
            .then(() => {
                setMessage(`User ${newUser.username} has been created.`);
                setIsCreating(false);
                handleClear();
            })
            .catch(() => {
                setMessage('Failed to create user.');
            });
    };

    return (
        <ImageBackground 
            source={require('../assets/Bg-02.png')} // Add your background image here
            style={styles.background}
        >
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
                    <TouchableOpacity style={styles.button} onPress={handleSearch}>
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleClear}>
                        <Text style={styles.buttonText}>Clear</Text>
                    </TouchableOpacity>
                    {!isCreating && (
                        <TouchableOpacity style={styles.button} onPress={handleCreateToggle}>
                            <Text style={styles.buttonText}>Create User</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {message ? <Text style={styles.message}>{message}</Text> : null}

                {searched && user && !isEditing && (
                    <View style={styles.userCard}>
                        <Text style={styles.userTitle}>User #{user.userId}</Text>
                        <Text style={styles.userText}>Username: {user.username}</Text>
                        <Text style={styles.userText}>Email: {user.email}</Text>
                        <Text style={styles.userText}>Role: {user.role}</Text>

                        <View style={styles.button}>
                            <TouchableOpacity style={styles.button} onPress={handleEditToggle}>
                                <Text style={styles.buttonText}>Edit User</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleDelete}>
                                <Text style={styles.buttonText}>Delete User</Text>
                            </TouchableOpacity>
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
                        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                            <Text style={styles.buttonText}>Update User</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {isCreating && (
                    <View style={styles.userCard}>
                        <Text style={styles.userTitle}>Create New User</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={newUser.name}
                            onChangeText={(value) => handleCreateInputChange('name', value)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={newUser.email}
                            onChangeText={(value) => handleCreateInputChange('email', value)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Phone Number"
                            value={newUser.phoneNumber}
                            keyboardType="phone-pad"
                            onChangeText={(value) => handleCreateInputChange('phoneNumber', value)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry={true}
                            value={newUser.password}
                            onChangeText={(value) => handleCreateInputChange('password', value)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Profile Picture URL"
                            value={newUser.profilePicture}
                            onChangeText={(value) => handleCreateInputChange('profilePicture', value)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            value={newUser.username}
                            onChangeText={(value) => handleCreateInputChange('username', value)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Role"
                            value={newUser.role}
                            onChangeText={(value) => handleCreateInputChange('role', value)}
                        />
                        <TouchableOpacity style={styles.button} onPress={handleCreate}>
                            <Text style={styles.buttonText}>Create User</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
            <View style={styles.footer}>
                <Text style={styles.footerText}>© 2024 Your Company Name</Text>
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
                    <Text style={styles.footerText}>HONEY BAR</Text>
                </TouchableOpacity>
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
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    searchBar: {
        flexDirection: 'column',
        alignItems: 'center', // Center align the items
        marginBottom: 20,
    },
    input: {
        width: '80%', // Adjust width to fit the screen
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        width: '80%', // Adjust width to fit the screen
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    userCard: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
    },
    userTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    userText: {
        fontSize: 16,
        marginBottom: 5,
    },
    message: {
        color: 'red',
        marginBottom: 15,
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
export default User;