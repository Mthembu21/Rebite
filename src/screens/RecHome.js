

import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather'; // Ensure you have this library installed
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Ensure you have this library installed

// Static data for donors
const donorsData = [
  {
    id: '1',
    name: 'Hendrick Farms',
    description: 'A family-run farm providing fresh produce.',
    image: require('../images/farmers-image.jpg'),
  },
  {
    id: '2',
    name: 'Shoprite',
    description: 'A leading supermarket chain in South Africa.',
    image: require('../images/shoprite.jpg'),
  },
  {
    id: '3',
    name: 'PinkPay',
    description: 'A convenient payment solution for shoppers.',
    image: require('../images/pick-n-pay.png'), 
  },
];

export default function RecHome() {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query) => setSearchQuery(query);

  const renderDonorItem = ({ item }) => (
    <View style={styles.donorItem}>
      <Image source={item.image} style={styles.donorImage} />
      <View style={styles.donorInfo}>
        <Text style={styles.donorName}>{item.name}</Text>
        <Text style={styles.donorDescription}>{item.description}</Text>
      </View>
    </View>
  );

  // Filter donors based on search query
  const filteredDonors = donorsData.filter(donor => 
    donor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle button presses
  const handleHomePress = () => {
    // Implement home navigation
    console.log('Home pressed');
  };

  const handleFoodBankPress = () => {
    // Implement food bank navigation
    console.log('Food Bank pressed');
  };

  const handleProfilePress = () => {
    // Implement profile navigation
    console.log('Profile pressed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Donors List</Text>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
        theme={{ colors: { primary: 'green' } }} 
      />
      <FlatList
        data={filteredDonors}
        renderItem={renderDonorItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleHomePress}>
          <Icon name="home" color="#187B1B" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFoodBankPress}>
          <MaterialIcons name="food-bank" color="#187B1B" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleProfilePress}>
          <Icon name="user" color="#187B1B" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'green', 
    marginTop: 40, 
  },
  searchbar: {
    marginBottom: 20,
    borderColor: 'green',
    borderWidth: 1, 
  },
  donorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8, 
    marginBottom: 10, 
  },
  donorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  donorInfo: {
    flex: 1, 
  },
  donorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  donorDescription: {
    fontSize: 14,
    color: 'gray', 
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  }});