import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CharactersList from '../screens/CharactersList';
import CharacterDetail from '../screens/CharacterDetail';

const Stack = createNativeStackNavigator();

export const RickStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Characters" component={CharactersList} options={{ title: 'Personajes' }} />
    <Stack.Screen name="CharacterDetail" component={CharacterDetail} options={{ title: 'Detalle' }} />
  </Stack.Navigator>
);

export default RickStack;
