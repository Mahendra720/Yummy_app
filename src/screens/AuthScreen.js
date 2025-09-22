import React, { useState } from 'react';
import { Alert, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AuthScreen({ navigation }) {
  const [mode, setMode] = useState('signin');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    // ✅ Validation
    if (!fullName.trim()) {
      Alert.alert("Validation Error", "Full name is required");
      return;
    }
    if (!email.trim()) {
      Alert.alert("Validation Error", "Email is required");
      return;
    }
    if (!password.trim() || password.length < 6) {
      Alert.alert("Validation Error", "Password is required and must be at least 6 characters");
      return;
    }

    try {
      const res = await fetch("http://192.168.1.174:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password })
      });
      const data = await res.json();

      if (data.success) {
        // Save user info if needed
        await AsyncStorage.setItem("userId", data.user.id);
        await AsyncStorage.setItem("userName", data.user.fullName);

        Alert.alert("Signup Successful", "You can now login.");
        setMode("signin"); // ✅ Switch to signin tab
        setFullName('');   // Clear signup fields
        setPassword('');
      } else {
        Alert.alert("Signup Failed", data.error || "Unknown error");
      }
    } catch (err) {
      console.log("Signup error:", err);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert("Validation Error", "Email is required");
      return;
    }
    if (!password.trim() || password.length < 6) {
      Alert.alert("Validation Error", "Password is required and must be at least 6 characters");
      return;
    }

    try {
      const res = await fetch("http://192.168.1.174:5000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (data.success) {
        await AsyncStorage.setItem("userId", data.user.id);
        await AsyncStorage.setItem("userName", data.user.fullName);
        navigation.replace("Main"); // Navigate to main/home screen
      } else {
        Alert.alert("Login Failed", data.error || "Invalid credentials");
      }
    } catch (err) {
      console.log("Login error:", err);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={{ flex: 1, padding: 18, backgroundColor: '#272323ff' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 200 }}>
        <TouchableOpacity onPress={() => setMode('signin')}>
          <Text style={[styles.tab, mode === 'signin' && styles.active]}>sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMode('signup')}>
          <Text style={[styles.tab, mode === 'signup' && styles.active]}>sign up</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 30 }}>
        {mode === 'signin' ? (
          <>
            <TextInput
              placeholder="Email Address"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              placeholder="Enter Password"
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.primaryBtn} onPress={handleLogin}>
              <Text style={{ color: '#fff', fontWeight: '800' }}>Login</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              placeholder="Full name"
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
            />
            <TextInput
              placeholder="Email address"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              placeholder="Create password"
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.primaryBtn} onPress={handleSignup}>
              <Text style={{ color: '#fff', fontWeight: '800' }}>Create Account</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tab: { marginHorizontal: 18, paddingVertical: 6, fontSize: 16, color: '#ff8c00' },
  active: { borderBottomWidth: 2, borderColor: '#ff8c00' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 8, marginBottom: 12, backgroundColor: '#fff' },
  primaryBtn: { backgroundColor: '#ff8c00', paddingVertical: 12, borderRadius: 12, alignItems: 'center' }
});
