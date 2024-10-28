import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//import ProfileScreen from '../screens/ProfileScreen';
//import DonHistory from '../screens/DonHistory';
import MakeDon from '../screens/MakeDon';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RecHome from '../screens/RecHome';

//RecHome
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        
       
        
       
        <Stack.Screen name="RecHome" component={RecHome} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        {/* <Stack.Screen name="MakeDon" component={MakeDon} /> */}

        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
        {/* <Stack.Screen name="DonHistory" component={DonHistory} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}