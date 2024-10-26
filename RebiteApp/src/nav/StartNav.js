import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '../screens/ProfileScreen';
import DonHistory from '../screens/DonHistory';
import MakeDon from '../screens/MakeDon';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="DonHistory" component={DonHistory} />
        <Stack.Screen name="MakeDon" component={MakeDon} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
