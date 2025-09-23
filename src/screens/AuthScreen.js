import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AuthScreen({ navigation }) {
  const [mode, setMode] = useState("signin");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const BACKEND_URL = "http://192.168.1.25:5000/api/auth"; // ✅ Your backend auth route

  // Save user to AsyncStorage
  const saveUser = async (user, token) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      await AsyncStorage.setItem("token", token);
      console.log("✅ User saved:", user);
    } catch (err) {
      console.error("AsyncStorage save error:", err);
    }
  };

  // Sign In
  const handleSignin = async () => {
    if (!email || !password) return Alert.alert("Error", "All fields are required");

    try {
      const res = await fetch(`${BACKEND_URL}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        await saveUser(data.user, data.token); // ✅ Save logged in user
        Alert.alert("Success", "Logged in successfully");
        navigation.replace("Main"); // replace to prevent going back
      } else {
        Alert.alert("Error", data.message || "Login failed");
      }
    } catch (err) {
      Alert.alert("Error", "Unable to connect to server");
    }
  };

  // Sign Up
  const handleSignup = async () => {
    if (!fullName || !email || !password) return Alert.alert("Error", "All fields are required");

    try {
      const res = await fetch(`${BACKEND_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        await saveUser(data.user, data.token); // ✅ Save new user
        Alert.alert("Success", "Account created successfully");
        navigation.replace("Main");
      } else {
        Alert.alert("Error", data.message || "Signup failed");
      }
    } catch (err) {
      Alert.alert("Error", "Unable to connect to server");
    }
  };

  return (
    <View style={{ flex: 1, padding: 18, backgroundColor: "#fff" }}>
      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 200 }}>
        <TouchableOpacity onPress={() => setMode("signin")}>
          <Text style={[styles.tab, mode === "signin" && styles.active]}>sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMode("signup")}>
          <Text style={[styles.tab, mode === "signup" && styles.active]}>sign up</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 30 }}>
        {mode === "signin" ? (
          <>
            <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
            <TextInput placeholder="Password" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />
            <TouchableOpacity style={styles.primaryBtn} onPress={handleSignin}>
              <Text style={{ color: "#fff", fontWeight: "800" }}>Login</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput placeholder="Full name" style={styles.input} value={fullName} onChangeText={setFullName} />
            <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
            <TextInput placeholder="Password" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />
            <TouchableOpacity style={styles.primaryBtn} onPress={handleSignup}>
              <Text style={{ color: "#fff", fontWeight: "800" }}>Create Account</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tab: { marginHorizontal: 18, paddingVertical: 6, fontSize: 16, color: "#ff8c00" },
  active: { borderBottomWidth: 2, borderColor: "#ff8c00" },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 10, borderRadius: 8, marginBottom: 12 },
  primaryBtn: { backgroundColor: "#ff8c00", paddingVertical: 12, borderRadius: 12, alignItems: "center" },
});
