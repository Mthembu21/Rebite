import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Location from 'expo-location'; 

export default function MakeDon() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null); 
  const [date, setDate] = useState(new Date());
  const [level, setLevel] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      let address = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (address.length > 0) {
        setCurrentLocation(address[0]); // Save the first address found
        setLocation(`${address[0].city}, ${address[0].region}, ${address[0].country}`); // Set location in a readable format
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.canceled) {
        setImage(result.uri);
    }
};

  const handleDonate = () => {
    const donationData = {
      name,
      quantity: parseInt(quantity), // Ensure quantity is a number
      image,
      date: date.toISOString().split('T')[0],
      location,
      level: category === "Fresh" ? 1 : 2,
      description,
    };

    console.log('Donation submitted:', donationData);
    // Make API call here to submit donationData
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Make a Donation</Text>
        </View>

        <Text style={styles.inputLabel}>Donation Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name of the donation"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.inputLabel}>Quantity</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter quantity"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />

        <Text style={styles.inputLabel}>Donation Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Text style={styles.inputLabel}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter location"
          value={location}
          onChangeText={setLocation}
        />

        <Text style={styles.inputLabel}>Date</Text>
        <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowDatePicker(true)}>
          <Text>{date.toISOString().split('T')[0]}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        <Text style={styles.inputLabel}>Freshness Level</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Category" value="" />
            <Picker.Item label="Fresh" value="Fresh" />
            <Picker.Item label="Spoiled" value="Spoiled" />
          </Picker>
        </View>

        <Text style={styles.inputLabel}>Upload Image</Text>
        <TouchableOpacity style={styles.imageUploadContainer} onPress={pickImage}>
    <TextInput
        style={styles.imageInput}
        placeholder={image ? 'Image Selected' : 'No file chosen'} // Update placeholder logic
        editable={false}
        value={image ? 'Image Selected' : ''} // Ensure this reflects the image selection
    />
    <Ionicons name="image-outline" size={24} color="#4caf50" style={styles.imageIcon} />
</TouchableOpacity>

        <TouchableOpacity style={styles.donateButton} onPress={handleDonate}>
          <Text style={styles.donateButtonText}>Donate</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => Alert.alert('Navigating to Home')}>
          <Icon name="home" type="feather" color="#187B1B" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Navigating to Food Bank')}>
          <MaterialIcons name="food-bank" color="#187B1B" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Navigating to Profile')}>
          <Icon name="user" type="feather" color="#187B1B" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    padding: 20,
    
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginTop: 10,
    
  },
  input: {
    borderWidth: 1,
    borderColor: '#187B1B',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    textAlignVertical: 'top',
    height: 80,
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#187B1B',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: '#187B1B',
    borderRadius: 5,
    marginBottom: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  picker: {
    height: 40,
    width: '100%',
  },
  imageUploadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#187B1B',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  imageInput: {
    flex: 1,
    color: '#000',
  },
  imageIcon: {
    marginLeft: 10,
  },
  donateButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 12,
    borderRadius: 10, 
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
},
donateButtonText: {
    color: '#ffffff', 
    fontSize: 18,
},
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderColor: '#e8e8e8',
    marginTop: 100,
  },
});