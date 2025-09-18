import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';
import { Ionicons } from '@expo/vector-icons';
import CartIcon from '../components/CartIcon';

const Tab = createBottomTabNavigator();
export default function BottomTabs(){
  return (
    <Tab.Navigator screenOptions={({navigation}) => ({
      headerRight: () => <CartIcon navigation={navigation} />,
      headerShown: true,
      tabBarShowLabel: false,
      tabBarStyle: { height: 60, paddingBottom: 8, paddingTop: 8 }
    })}>
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon: ({color, size}) => <Ionicons name="home-outline" size={22} />
      }} />
      <Tab.Screen name="Menu" component={MenuScreen} options={{
        tabBarIcon: ({color,size}) => <Ionicons name="fast-food-outline" size={22} />
      }} />
      <Tab.Screen name="Profile" component={HomeScreen} options={{
        tabBarIcon: () => <Ionicons name="person-outline" size={22} />
      }} />
    </Tab.Navigator>
  );
}
