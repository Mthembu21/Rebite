import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Buffer } from 'buffer'; // Import Buffer

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [resetPasswordActive, setResetPasswordActive] = useState(false);
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://rebite.onrender.com/api/users/login', { email, password });
            const token = response.data.user;

            if (token) {
                // Decode JWT token payload manually using Buffer
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = Buffer.from(base64, 'base64').toString('utf-8');
                const decodedToken = JSON.parse(jsonPayload);
                console.log('Decoded Token:', decodedToken);

                const userType = decodedToken.type;

                if (userType === 'donor') {
                    navigation.navigate('MakeDon');                } else if (userType === 'recipient') {
                    navigation.navigate('RecHome');
                } else {
                    Alert.alert('Error', 'Unknown user type');
                }
            } else {
                Alert.alert('Error', 'No token received');
            }
        } catch (error) {
            console.error('Login Error:', error);
            Alert.alert('Error', error.response?.data?.message || 'Login failed! Please check your credentials.');
        }
    };
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <Image source={require('../images/Logo.jpg')} style={styles.logo} />
            <Text style={styles.header}>Welcome Back!</Text>

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
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Icon name={showPassword ? 'eye-off' : 'eye'} size={24} color="#187B1B" />
                </TouchableOpacity>
            </View>

            <View style={styles.resetPasswordContainer}>
                <TouchableOpacity
                    onPress={() => Alert.alert('Reset Password')}
                    onPressIn={() => setResetPasswordActive(true)}
                    onPressOut={() => setResetPasswordActive(false)}
                >
                    <Text style={[styles.resetPassword, resetPasswordActive && styles.resetPasswordActive]}>
                        Reset Password
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={{ color: '#fff' }}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                <Text style={styles.toggleText}>
                    <Text style={styles.blackText}>Don't have an account? </Text>
                    <Text style={styles.blueText}>Register now!</Text>
                </Text>
            </TouchableOpacity>
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
    },
    header: {
        fontSize: 30,
        color: 'green',
        marginBottom: 20,
    },
    label: {
        alignSelf: 'flex-start',
        color: '#187B1B',
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
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: '#187B1B',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    passwordInput: {
        flex: 1,
        paddingVertical: 10,
    },
    button: {
        padding: 15,
        backgroundColor: '#187B1B',
        color: '#fff',
        borderRadius: 5,
        textAlign: 'center',
        marginTop: 10,
        width: 320, 
        height: 45, 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    toggleText: {
        marginTop: 20,
    },
    blackText: {
        color: 'black',
    },
    blueText: {
        color: '#187B1B',
    },
    resetPasswordContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
    },
    resetPassword: {
        color: '#187B1B',
        fontSize: 12,
        marginTop: 5,
    },
    resetPasswordActive: {
        color: 'blue',
    },
});

export default LoginScreen;