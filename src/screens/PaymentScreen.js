import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from "react-native";
import ProgressSteps from "../components/ProgressSteps";
import { useCart } from "../context/CartContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BACKEND_URL = "http://192.168.1.25:5000"; // Replace with your PC's LAN IP

export default function PaymentScreen({ route, navigation }) {
  const { state, dispatch } = useCart();
  const { address } = route.params || {};
  const items = state.items;
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  const [method, setMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardMonth, setCardMonth] = useState("");

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const u = await AsyncStorage.getItem("user");
      if (u) setUser(JSON.parse(u));
    };
    loadUser();
  }, []);

  const placeOrder = async () => {
    if (!user) {
      Alert.alert("Error", "User not logged in");
      return;
    }

    if (!address || !address.name || !address.addr || !address.city || !address.phone) {
      Alert.alert("Error", "Address is incomplete");
      return;
    }

    if (method === "card" && (!cardNumber || !cardName || !cardMonth)) {
      Alert.alert("Error", "All card fields are required");
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          items,
          address,
          subtotal,
          payment: {
            method,
            card: method === "card" ? { number: cardNumber, name: cardName, month: cardMonth } : null,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Something went wrong");

      Alert.alert("Success", "Order placed successfully");
      dispatch({ type: "CLEAR" });
      navigation.replace("OrderComplete");
    } catch (err) {
      console.error("❌ Place order error:", err);
      Alert.alert("Error", err.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ProgressSteps step={3} total={3} />

      <View style={{ padding: 16 }}>
        <Text style={{ fontWeight: "700", fontSize: 18 }}>Choose Payment Method</Text>

        <TouchableOpacity style={[styles.methodBtn, method === "card" && styles.activeMethod]} onPress={() => setMethod("card")}>
          <Text>Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.methodBtn, method === "cod" && styles.activeMethod]} onPress={() => setMethod("cod")}>
          <Text>Cash on Delivery</Text>
        </TouchableOpacity>

        {method === "card" && (
          <View style={{ marginTop: 12 }}>
            <TextInput placeholder="Card Number" style={styles.input} keyboardType="numeric" value={cardNumber} onChangeText={setCardNumber} />
            <TextInput placeholder="Name on Card" style={styles.input} value={cardName} onChangeText={setCardName} />
            <TextInput placeholder="Expiry Month" style={styles.input} value={cardMonth} onChangeText={setCardMonth} />
          </View>
        )}

        <TouchableOpacity style={styles.placeBtn} onPress={placeOrder}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  methodBtn: { padding: 12, marginTop: 10, borderWidth: 1, borderColor: "#ddd", borderRadius: 8 },
  activeMethod: { borderColor: "#39b54a" },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 10, borderRadius: 8, marginTop: 10 },
  placeBtn: { backgroundColor: "#ff8c00", padding: 14, borderRadius: 10, alignItems: "center", marginTop: 20 },
});
