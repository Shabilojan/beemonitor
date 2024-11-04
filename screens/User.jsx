import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import axios from 'axios';

const User = ({ navigation }) => {  
    const [user, setUser] = useState(null);
    const [username, setusername] = useState('');
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
        axios.get(`http://10.0.2.2:5000/user-details/${username}`)
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
        if (username) {
            setSearched(true);
            fetchUserDetails();
        }
    };

    const handleClear = () => {
        setUser(null);
        setusername('');
        setSearched(false);
        setMessage('');
        setIsEditing(false);
        setIsCreating(false);
    };

    const handleDelete = () => {
        Alert.alert('Delete Confirmation', `Are you sure you want to delete User #${username}?`, [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Delete',
                onPress: () => {
                    axios.delete(`http://10.0.2.2:5000/user-details/${username}`)
                        .then(() => {
                            setMessage(`User #${username} has been deleted.`);
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
        axios.put(`http://10.0.2.2:5000/user-details/${username}`, editData)
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

    const validateInputs = () => {
        const { name, email, phoneNumber, password, username, role } = newUser;
        const phoneRegex = /^[0-9]{10}$/;
        const usernameRegex = /^[a-zA-Z0-9]{8,10}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (name.length > 30) return "Name must be within 30 characters.";
        if (!usernameRegex.test(username)) return "Username must be 8-10 characters long.";
        if (!phoneRegex.test(phoneNumber)) return "Phone number must be exactly 10 digits.";
        if (!passwordRegex.test(password)) return "Password must include uppercase, lowercase, number, and special character.";
        if (!['admin', 'user'].includes(role)) return "Role must be 'admin' or 'user'.";

        return null;
    };

    const handleCreate = () => {
        const validationError = validateInputs();
        if (validationError) {
            setMessage(validationError);
            return;
        }

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
                        value={username}
                        onChangeText={setusername}
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
                            maxLength={10} // Enforce max length for phone number
                            onChangeText={(value) => handleCreateInputChange('phoneNumber', value)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry={true}
                            value={newUser.password}
                            onChangeText={(value) => handleCreateInputChange('password', value)}
                            maxLength={8} // Enforce max length for password
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
        </ImageBackground>
    );
};



const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    container: {
        width: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: 'white',
    },
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    input: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginRight: 10,
        backgroundColor: '#000',
    },
    button: {
        backgroundColor: '#007BFF',
        borderRadius: 5,
        padding: 10,
        margin: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    userCard: {
        marginVertical: 10,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#000',
    },
    userTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    userText: {
        fontSize: 16,
        marginVertical: 5,
    },
    message: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginVertical: 10,
    },
});

export default User;
