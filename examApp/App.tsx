import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainTab from './src/navigator/MainTab';

export default function App() {
  return (
    <NavigationContainer>
      <MainTab />
    </NavigationContainer>
  );
}
