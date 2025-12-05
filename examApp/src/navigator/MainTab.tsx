import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RickStack from './RickStack';
import Locations from '../screens/Locations';
import { Text, View } from 'react-native';

const Tab = createBottomTabNavigator();

export const MainTab = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: '#2C6BED',
      tabBarInactiveTintColor: '#8E8E93',
      tabBarStyle: { backgroundColor: '#fff', borderTopColor: '#eee', height: 72, paddingBottom: 10, shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: -4 }, elevation: 8, borderTopLeftRadius: 12, borderTopRightRadius: 12 },
      tabBarIcon: ({ color }) => (
        <View style={{ width: 34, alignItems: 'center' }}>
          <Text style={{ fontSize: 20, color }}>{route.name === 'Rick' ? '👾' : '📍'}</Text>
        </View>
      ),
      tabBarLabelStyle: { fontSize: 12, marginBottom: 4 }
    })}
  >
    <Tab.Screen name="Rick" component={RickStack} options={{ tabBarLabel: 'Personajes' }} />
    <Tab.Screen name="Locations" component={Locations} options={{ tabBarLabel: 'Sensor' }} />
  </Tab.Navigator>
);

export default MainTab;
