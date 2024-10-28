


import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function DonationPage  () {
  // Sample data for the donation
  const donationData = {
    donorName: 'Shoprite',
    itemName: 'Boxes of Milk',
    quantity: 10,
    image: require('../images/milk-boxes.jpg'), 
  };

  const handleRequest = () => {
    // Handle request logic here
    alert('Request sent successfully!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Donation Details</Text>
      <View style={styles.imageContainer}>
        <Image source={donationData.image} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Donor:</Text>
        <Text style={styles.value}>{donationData.donorName}</Text>
        
        <Text style={styles.label}>Item:</Text>
        <Text style={styles.value}>{donationData.itemName}</Text>
        
        <Text style={styles.label}>Quantity:</Text>
        <Text style={styles.value}>{donationData.quantity}</Text>
      </View>
      <TouchableOpacity style={styles.requestButton} onPress={handleRequest}>
        <Text style={styles.buttonText}>Request</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'green',
    marginTop: 40, 
  },
  imageContainer: {
    borderWidth: 2, 
    borderColor: 'lightgray', 
    borderRadius: 10, 
    overflow: 'hidden',
    marginBottom: 20, 
  },
  image: {
    width: '100%',
    height: 180, 
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 20, 
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  value: {
    fontSize: 16,
    color: 'darkgray',
    marginBottom: 10,
  },
  requestButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
 RequestPage;


