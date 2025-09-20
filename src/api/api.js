import axios from "axios";
import { Alert } from "react-native";

const API_URL = "http://192.168.1.7:5000/api"; // your backend

export async function signup(name, email, password) {
  try {
    const res = await axios.post(`${API_URL}/auth/signup`, { name, email, password });
    Alert.alert("Success", "Account created successfully!");
    return res.data;
  } catch (err) {
    console.log("Signup error:", err.response?.data || err.message);
    Alert.alert("Error", err.response?.data?.message || "Signup failed");
    return null;
  }
}

export async function signin(email, password) {
  try {
    const res = await axios.post(`${API_URL}/auth/signin`, { email, password });
    Alert.alert("Success", "Login successful!");
    return res.data;
  } catch (err) {
    console.log("Signin error:", err.response?.data || err.message);
    Alert.alert("Error", err.response?.data?.message || "Login failed");
    return null;
  }
}

export async function addToCart(userId, productId, quantity = 1) {
  try {
    const res = await axios.post(`${API_URL}/cart/add`, {
      userId,
      productId,
      quantity,
    });
    Alert.alert("Success", "Item added successfully!");
    return res.data;
  } catch (err) {
    console.log("Cart error:", err.response?.data || err.message);
    Alert.alert("Error", err.response?.data?.message || "Failed to add item");
    return null;
  }
}
