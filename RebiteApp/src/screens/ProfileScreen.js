import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const [profileImage, setProfileImage] = useState(null);
  const navigation = useNavigation();

  const handleAccountDetails = () => {
    Alert.alert('Navigating to Account Details');
  };

  const handleDonorList = () => {
    Alert.alert('Navigating to Donor List');
  };

  const handleHistory = () => {
    navigation.navigate('DonHistory');
  };

  const handleRequestedDonations = () => {
    Alert.alert('Navigating to Requested Donations');
  };
  const handleHomePress = () => {
    Alert.alert('Navigating to Home');
  };

  const handleFoodBankPress = () => {
    Alert.alert('Navigating to Food Bank');
  };

  const handleProfilePress = () => {
    Alert.alert('Navigating to Profile');
  };
  const handleImageUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      setProfileImage(result.uri); 
    }
  };
  const handleLogout = () => {
    Alert.alert('Logged out successfully!');
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Account Donations</Text>
      </View>
      
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <Avatar
            rounded
            source={{ uri: profileImage || 'https://via.placeholder.com/150' }}
            size="large"
          />
          <TouchableOpacity style={styles.cameraIcon} onPress={handleImageUpload}>
            <Icon name="camera" type="feather" color="#fff" size={20} />
          </TouchableOpacity>
        </View>
        <Text style={styles.emailText}>Email@gmail.com</Text>
      </View>

      <View style={styles.buttonContainer}>
        <ProfileButton title="Account Details" onPress={handleAccountDetails} />
        <ProfileButton title="Donor List" onPress={handleDonorList} />
        <ProfileButton title="History" onPress={handleHistory} />
        <ProfileButton title="Requested Donations" onPress={handleRequestedDonations} />
      </View>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutContainer}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleHomePress}>
          <Icon name="home" type="feather" color="#187B1B" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFoodBankPress}>
          <MaterialIcons name="food-bank" color="#187B1B" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleProfilePress}>
          <Icon name="user" type="feather" color="#187B1B" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ProfileButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    
  },
  headerText: {
    color: '#187B1B',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', 
    flex: 1, 
  },
  profileContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 16, 
  },
  avatarContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#187B1B',
    borderRadius: 15,
    padding: 5,
  },
  emailText: {
    fontSize: 16,
    marginRight:100
  },
  buttonContainer: {
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderColor: '#e8e8e8',
    marginTop:100
  },
  logoutContainer: {
    alignItems: 'center',
    marginVertical: 10, 
  },
  logoutText: {
    fontSize: 16,
    color: '#989797', 
    marginLeft: 260,
    marginTop: 30,
  },
});