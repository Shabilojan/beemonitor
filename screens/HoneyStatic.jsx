import React, { useState } from 'react';
import { View, Text, Image, TextInput, Alert, ScrollView, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import axios from 'axios';

const HoneyStatic = ({ navigation }) => {
    const [honey, setHoney] = useState(null);
    const [hiveNo, setHiveNo] = useState('');
    const [searched, setSearched] = useState(false);
    const [message, setMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [isCreating, setIsCreating] = useState(false);
    const [newHoney, setNewHoney] = useState({
        hiveNo: '',
        glucose: '',
        fructose: '',
        polysaccharides: '',
        vitamins: '',
        proteins: '',
        rating: '',
    });

    const fetchHoneyDetails = () => {
        axios.get(`http://192.168.161.173:5000/honey/${hiveNo}`)
            .then(response => {
                if (response.data.success) {
                    setHoney(response.data.data[0]);
                    setEditData(response.data.data[0]);
                    setMessage('');
                } else {
                    setHoney(null);
                    setMessage('No honey static data found.');
                }
            })
            .catch(error => {
                setHoney(null);
                setMessage('Error fetching honey static data');
            });
    };

    const handleSearch = () => {
        if (hiveNo) {
            setSearched(true);
            fetchHoneyDetails();
        }
    };

    const handleClear = () => {
        setHoney(null);
        setHiveNo('');
        setSearched(false);
        setMessage('');
        setIsEditing(false);
        setIsCreating(false);
    };

    const handleDelete = () => {
        Alert.alert('Delete Confirmation', `Are you sure you want to delete Honey Static for Hive #${hiveNo}?`, [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Delete',
                onPress: () => {
                    axios.delete(`http://192.168.161.173:5000/honey/`)
                        .then(() => {
                            setMessage(`Honey Static for Hive #${hiveNo} has been deleted.`);
                            setHoney(null);
                            setSearched(false);
                            setHiveNo('');
                            setIsEditing(false);
                        })
                        .catch(() => {
                            setMessage('Failed to delete honey static data.');
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
        axios.put(`http://192.168.161.173:5000/honey/${hiveNo}`, editData)
            .then(() => {
                setMessage(`Honey Static for Hive #${editData.hiveNo} has been updated.`);
                setIsEditing(false);
                fetchHoneyDetails();
            })
            .catch(() => {
                setMessage('Failed to update honey static data.');
            });
    };

    const handleCreateToggle = () => {
        setIsCreating(!isCreating);
        setNewHoney({
            hiveNo: '',
            glucose: '',
            fructose: '',
            polysaccharides: '',
            vitamins: '',
            proteins: '',
            rating: '',
        });
    };

    const handleCreateInputChange = (name, value) => {
        setNewHoney(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validateInputs = () => {
        const { hiveNo, glucose, fructose, polysaccharides, vitamins, proteins, rating } = newHoney;

        if (!hiveNo) {
            setMessage('Hive number is required.');
            return false;
        }

        // Add more validation checks if necessary

        return true;
    };

    const handleCreate = () => {
        if (validateInputs()) {
            axios.post('http://192.168.161.173:5000/honey', newHoney)
                .then(() => {
                    setMessage(`Honey Static for Hive #${newHoney.hiveNo} has been created.`);
                    setIsCreating(false);
                    setHoney(null);
                    setHiveNo('');
                })
                .catch(() => {
                    setMessage('Honey static data already exists.');
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
                    <Text style={styles.title}>Honey Static Details</Text>
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
                                <Text style={styles.buttonText}>Create </Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {message ? <Text style={styles.message}>{message}</Text> : null}

                    {searched && honey && !isEditing && (
                        <View style={styles.hiveCard}>
                            <Text style={styles.hiveTitle}>Hive #{honey.hiveNo}</Text>
                            <Text style={styles.hiveText}>Glucose: {honey.glucose}</Text>
                            <Text style={styles.hiveText}>Fructose: {honey.fructose}</Text>
                            <Text style={styles.hiveText}>Polysaccharides: {honey.polysaccharides}</Text>
                            <Text style={styles.hiveText}>Vitamins: {honey.vitamins}</Text>
                            <Text style={styles.hiveText}>Proteins: {honey.proteins}</Text>
                            <Text style={styles.hiveText}>Rating: {honey.rating}</Text>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={handleEditToggle}>
                                    <Text style={styles.buttonText}>Edit Honey Static</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={handleDelete}>
                                    <Text style={styles.buttonText}>Delete Honey Static</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {isEditing && (
                        <View style={styles.hiveCard}>
                            <Text style={styles.hiveTitle}>Edit Honey Static for Hive #{editData.hiveNo}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Glucose"
                                value={editData.glucose}
                                onChangeText={(value) => handleEditInputChange('glucose', value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Fructose"
                                value={editData.fructose}
                                onChangeText={(value) => handleEditInputChange('fructose', value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Polysaccharides"
                                value={editData.polysaccharides}
                                onChangeText={(value) => handleEditInputChange('polysaccharides', value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Vitamins"
                                value={editData.vitamins}
                                onChangeText={(value) => handleEditInputChange('vitamins', value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Proteins"
                                value={editData.proteins}
                                onChangeText={(value) => handleEditInputChange('proteins', value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Rating"
                                value={editData.rating}
                                onChangeText={(value) => handleEditInputChange('rating', value)}
                            />
                            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                                <Text style={styles.buttonText}>Update Honey Static</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {isCreating && (
                        <View style={styles.hiveCard}>
                            <Text style={styles.hiveTitle}>Create New Honey Static</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Hive Number"
                                value={newHoney.hiveNo}
                                onChangeText={(value) => handleCreateInputChange('hiveNo', value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Glucose"
                                value={newHoney.glucose}
                                onChangeText={(value) => handleCreateInputChange('glucose', value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Fructose"
                                value={newHoney.fructose}
                                onChangeText={(value) => handleCreateInputChange('fructose', value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Polysaccharides"
                                value={newHoney.polysaccharides}
                                onChangeText={(value) => handleCreateInputChange('polysaccharides', value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Vitamins"
                                value={newHoney.vitamins}
                                onChangeText={(value) => handleCreateInputChange('vitamins', value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Proteins"
                                value={newHoney.proteins}
                                onChangeText={(value) => handleCreateInputChange('proteins', value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Rating"
                                value={newHoney.rating}
                                onChangeText={(value) => handleCreateInputChange('rating', value)}
                            />
                            <TouchableOpacity style={styles.button} onPress={handleCreate}>
                                <Text style={styles.buttonText}>create</Text>
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
                <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.footerItem}>
                    <Image source={require('../assets/vector3.png')} style={styles.roundIcon} />
                    <Text style={styles.centeredText}>Dashboard</Text>
                    </TouchableOpacity>
                </View>
               
                
                <TouchableOpacity onPress={() => navigation.navigate('HoneyStatic')} style={styles.footerItem}>
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
    scrollContainer: {
        paddingBottom: 40,
    },
    searchContainer: {
        marginBottom: 10,
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
      width: '100%',
  },
    button: {
      backgroundColor: '#ffa500',
      padding: 10,
      marginBottom:10,
      borderRadius: 5,
      flex: 1,
      marginHorizontal: 5,
      alignItems: 'center',
  },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    message: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 20,
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
      width: '101%',
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

export default HoneyStatic;     