// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Home';  // Import Home.js
import Dashboard from './Dashboard';
import AddItem from './AddItem';
import ShoppingList from './ShoppingList';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="AddItem" component={AddItem} options={{ headerShown: false }} />
        <Stack.Screen name="ShoppingList" component={ShoppingList} options={{ headerShown: false }} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}