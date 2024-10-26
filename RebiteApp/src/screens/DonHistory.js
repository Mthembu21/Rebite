import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 

export default function DonHistory() {
  const [expandedSections, setExpandedSections] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
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
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Donation History</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        

        <Text style={styles.subtitle}>Filter donations</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search donors..."
          />
          <Icon name="search" type="feather" color="#fff" containerStyle={styles.searchIcon} />
        </View>

        <Text style={styles.subtitle}>Currently in Progress</Text>
        <TouchableOpacity style={styles.section} onPress={() => toggleSection('current')}>
          <Text style={styles.sectionText}>Current Donations</Text>
          <Icon name={expandedSections.current ? "chevron-up" : "chevron-down"} type="feather" color="#333" />
        </TouchableOpacity>

        <Text style={styles.subtitle}>Tracking Donations</Text>
        {['Last 7 days Donations', 'Last 30 days Donations', 'Last 3 months Donations', 'Last 6 months Donations'].map((title, index) => (
          <TouchableOpacity
            key={index}
            style={styles.section}
            onPress={() => toggleSection(title)}
          >
            <Text style={styles.sectionText}>{title}</Text>
            <Icon name={expandedSections[title] ? "chevron-up" : "chevron-down"} type="feather" color="#333" />
          </TouchableOpacity>
        ))}

        <Button
          title="Delete"
          buttonStyle={styles.deleteButton}
        />
      </ScrollView>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
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
  content: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#187B1B',
    marginTop: 20,
    marginBottom: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6e6e6',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  searchIcon: {
    backgroundColor: '#187B1B',
    borderRadius: 5,
    padding: 8,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  sectionText: {
    fontSize: 16,
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#4CAF50',
    marginTop: 20,
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
});