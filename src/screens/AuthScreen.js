import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function AuthScreen({ navigation }) {
  const [mode, setMode] = useState('signin');

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Replace this with your backend IP or server URL
  const API_URL = 'http://192.168.54.216:5001/api/auth'; // <-- change to your local IP

  // Validation & API Call for Sign In
  const handleSignin = async () => {
    if (!email || !password) {
      return Alert.alert('Error', 'All fields are required');
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return Alert.alert('Error', 'Invalid email format');
    }
    if (password.length < 6) {
      return Alert.alert('Error', 'Password must be at least 6 characters');
    }

    try {
      const res = await fetch(`${API_URL}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        Alert.alert('Success', 'Logged in successfully!');
        navigation.navigate('Main');
      } else {
        Alert.alert('Error', data.message || 'Signin failed');
      }
    } catch (err) {
      Alert.alert('Error', 'Server not reachable');
    }
  };

  // Validation & API Call for Sign Up
  const handleSignup = async () => {
    if (!fullName || !email || !password) {
      return Alert.alert('Error', 'All fields are required');
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return Alert.alert('Error', 'Invalid email format');
    }
    if (password.length < 6) {
      return Alert.alert('Error', 'Password must be at least 6 characters');
    }

    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        Alert.alert('Success', 'Account created!');
        navigation.navigate('Main');
      } else {
        Alert.alert('Error', data.message || 'Signup failed');
      }
    } catch (err) {
      Alert.alert('Error', 'Server not reachable');
    }
  };

  return (
    <View style={{ flex: 1, padding: 18, backgroundColor: '#fff' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 200 }}>
        <TouchableOpacity onPress={() => setMode('signin')}>
          <Text style={[styles.tab, mode === 'signin' && styles.active]}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMode('signup')}>
          <Text style={[styles.tab, mode === 'signup' && styles.active]}>Sign Up</Text>
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
            <TouchableOpacity style={styles.primaryBtn} onPress={handleSignin}>
              <Text style={{ color: '#fff', fontWeight: '800' }}>Login</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              placeholder="Full Name"
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
            />
            <TextInput
              placeholder="Email Address"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              placeholder="Create Password"
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
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 8, marginBottom: 12 },
  primaryBtn: { backgroundColor: '#ff8c00', paddingVertical: 12, borderRadius: 12, alignItems: 'center' }
});
