import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('donor');
    const [companyName, setCompanyName] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');

    const handleRegister = async () => {
        try {
            const response = await axios.post('https://rebite.onrender.com/api/users/register', {
                name: companyName,
                email: email,
                password: password,
                type: userType,
                description: companyDescription
            });
            Alert.alert('Registration Successful', 'You have been registered successfully!');
            navigation.navigate('LoginScreen');
        } catch (error) {
            console.error(error);
            Alert.alert('Registration Failed', 'Please check your details and try again.');
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>

                <Image source={require('../images/Logo.jpg')} style={styles.logo} />
                <Text style={styles.header}>Create Account</Text>
              
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <Text style={styles.label}>Type of User</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={userType}
                        onValueChange={(itemValue) => setUserType(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select" value="" />
                        <Picker.Item label="Donor" value="donor" />
                        <Picker.Item label="Recipient" value="recipient" />
                    </Picker>
                </View>

                {(userType === 'donor' || userType === 'recipient') && (
                    <>
                        <Text style={styles.label}>Company Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter company name"
                            value={companyName}
                            onChangeText={setCompanyName}
                        />
                        <Text style={styles.label}>Company Description</Text>
                        <TextInput
                            style={styles.textArea}
                            placeholder="Enter a brief description of your company"
                            value={companyDescription}
                            onChangeText={setCompanyDescription}
                            multiline
                        />
                    </>
                )}

                <TouchableOpacity onPress={handleRegister}>
                    <Text style={styles.button}>Register!</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={styles.toggleText}>
                        <Text style={styles.blackText}>Already have an account? </Text>
                        <Text style={styles.blueText}>Login!</Text>
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },

    logo: {
        width: 100,
        height: 100,
        marginVertical: 10,
        alignSelf: 'center',

    },
    header: {
        fontSize: 30,
        color: 'green',
        marginBottom: 20,
        textAlign: 'center',

    },
    label: {
        alignSelf: 'flex-start',
        color: 'green',
        marginBottom: 5,
        fontSize: 16,
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#187B1B',
        borderRadius: 5,
    },
    pickerContainer: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#187B1B',
        borderRadius: 5,
        marginVertical: 10,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    textArea: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#187B1B',
        borderRadius: 5,
        height: 100,
        textAlignVertical: 'top', // ensures the text starts at the top for multiline input
    },
    button: {
        padding: 15,
        backgroundColor: '#187B1B',
        color: '#fff',
        borderRadius: 5,
        textAlign: 'center',
        width: 320, 
        height: 45, 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    toggleText: {
        marginTop: 20,
        textAlign: 'center',

    },
    blackText: {
        color: 'black',
    },
    blueText: {
        color: '#187B1B',
    },
});

export default RegisterScreen;