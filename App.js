import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const App = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('donor');
    const [companyName, setCompanyName] = useState('');
    const [resetPasswordActive, setResetPasswordActive] = useState(false);

    const handleToggle = () => {
        setIsLogin(!isLogin);
    };

    const handleSubmit = () => {
        // Handle login or registration
        console.log({ email, password, userType, companyName });
        Alert.alert('Submitted', `Email: ${email}, User Type: ${userType}, Company Name: ${companyName}`);
    };

    const handleResetPassword = () => {
        // Reset password functionality
        Alert.alert('Reset Password');
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <Image source={require('./assets/logo.png')} style={styles.logo} />
            <Text style={styles.header}>{isLogin ? 'Welcome Back!' : 'Create Account'}</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {isLogin && (
                <View style={styles.resetPasswordContainer}>
                    <TouchableOpacity
                        onPress={handleResetPassword}
                        onPressIn={() => setResetPasswordActive(true)}
                        onPressOut={() => setResetPasswordActive(false)}
                    >
                        <Text style={[styles.resetPassword, resetPasswordActive && styles.resetPasswordActive]}>
                            Reset Password
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            {!isLogin && userType === 'donor' && (
                <>
                    <Text style={styles.label}>Company Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter company name"
                        value={companyName}
                        onChangeText={setCompanyName}
                    />
                </>
            )}

            {!isLogin && (
                <>
                    <Text style={styles.label}>Type of User</Text>
                    <Picker
                        selectedValue={userType}
                        onValueChange={(itemValue) => setUserType(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Donor" value="donor" />
                        <Picker.Item label="Recipient" value="recipient" />
                    </Picker>
                </>
            )}

            <TouchableOpacity onPress={handleSubmit}>
                <Text style={styles.button}>{isLogin ? 'Sign In' : 'Register!'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleToggle}>
                <Text style={styles.toggleText}>
                    {isLogin ? (
                        <>
                            <Text style={styles.blackText}>Don't have an account? </Text>
                            <Text style={styles.blueText}>Register now!</Text>
                        </>
                    ) : (
                        <>
                            <Text style={styles.blackText}>Already have an account? </Text>
                            <Text style={styles.blueText}>Login!</Text>
                        </>
                    )}
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
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    label: {
        color: 'green',
        marginTop: 10,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    button: {
        padding: 15,
        backgroundColor: 'green',
        color: '#fff',
        borderRadius: 5,
        textAlign: 'center',
        marginTop: 10,
    },
    toggleText: {
        marginTop: 20,
        color: 'black', // default text color
    },
    blackText: {
        color: 'black',
    },
    blueText: {
        color: 'blue',
    },
    resetPasswordContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end', // Align to the right
        width: '100%', // Full width to align text properly
    },
    resetPassword: {
        color: 'gray',
        fontSize: 12,
        marginTop: 5,
    },
    resetPasswordActive: {
        color: 'blue',
    },
});

export default App;
