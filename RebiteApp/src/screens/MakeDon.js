import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 

export default function MakeDonationScreen() {
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
        <Icon name="arrow-left" type="feather" color="#fff" size={24} />
        <Text style={styles.headerText}>Donors List</Text>
        <Icon name="bell" type="feather" color="#fff" size={24} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>Items to donate</Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Food Items</Text>
            <Text style={styles.tableHeaderText}>Non Food</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableRowText}>-</Text>
            <Text style={styles.tableRowText}>-</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.newItemsButton}>
          <Text style={styles.newItemsText}>New items</Text>
        </TouchableOpacity>
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
    marginVertical: 5,
    textAlign: 'center', 

  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e6e6e6',
  },
  tableHeaderText: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableRowText: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 10,
    color: '#333',
  },
  newItemsButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  newItemsText: {
    color: '#4CAF50',
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
});