import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import AuthScreen from "../screens/AuthScreen";
import BottomTabs from "./BottomTabs";
import ProductDetails from "../screens/ProductDetails";
import CartScreen from "../screens/CartScreen";
import AddressScreen from "../screens/AddressScreen";
import PaymentScreen from "../screens/PaymentScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import OrderComplete from "../screens/OrderComplete";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Main" component={BottomTabs} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Address" component={AddressScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="OrderComplete" component={OrderComplete} />
    </Stack.Navigator>
  );
}
