import React from 'react';
import { Statusbar } from 'expo-status-bar';
import { Text, View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './Screens/Home';
import ISSLocation from './Screens/ISSLocation';
import MeteorScreen from './Screens/MeteorScreen';
import UpdateScreen from './Screens/UpdateScreen';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ISSLocation" component={ISSLocation} />
        <Stack.Screen name="Meteors" component={MeteorScreen} />
        <Stack.Screen name="Updates" component={UpdateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();

const styles = StyleSheet.create({});
