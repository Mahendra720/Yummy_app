import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddressScreen({ navigation }) {
  const [form, setForm] = useState({ name: '', addr: '', city: '', phone: '' });

  const handleSaveAddress = async () => {
    // 1️⃣ Simple validation
    if (!form.name || !form.addr || !form.city || !form.phone) {
      Alert.alert('Validation Error', 'All fields are required');
      return;
    }

    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert('Error', 'User not logged in');
        return;
      }

      console.log('Sending request:', { userId, ...form });

      const res = await fetch('http://192.168.1.174:5000/api/address/save', { // Use 10.0.2.2 for Android emulator
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ...form }),
      });

      console.log('Response status:', res.status);

      // 2️⃣ Read response as text first to debug
      const text = await res.text();
      console.log('Raw response:', text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.log('Failed to parse JSON:', err);
        Alert.alert('Error', 'Invalid server response. Make sure backend is running.');
        return;
      }

      if (data.success) {
        Alert.alert('Success', 'Address saved successfully');
        navigation.navigate('Checkout', { address: data.address });
      } else {
        Alert.alert('Error', data.error || 'Failed to save address');
      }

    } catch (err) {
      console.log('Address save error:', err);
      Alert.alert('Error', 'Something went wrong while saving address');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: '900' }}>Deliver to</Text>
        <Text style={{ marginTop: 12 }}>Enter Delivery Address</Text>
      </View>

      <View style={{ padding: 16 }}>
        <TextInput
          placeholder="Name"
          style={styles.input}
          value={form.name}
          onChangeText={(t) => setForm({ ...form, name: t })}
        />
        <TextInput
          placeholder="Address"
          style={styles.input}
          value={form.addr}
          onChangeText={(t) => setForm({ ...form, addr: t })}
        />
        <TextInput
          placeholder="City"
          style={styles.input}
          value={form.city}
          onChangeText={(t) => setForm({ ...form, city: t })}
        />
        <TextInput
          placeholder="Phone"
          style={styles.input}
          value={form.phone}
          onChangeText={(t) => setForm({ ...form, phone: t })}
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={styles.primaryBtn} onPress={handleSaveAddress}>
          <Text style={{ color: '#fff', fontWeight: '800' }}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 12 },
  primaryBtn: { backgroundColor: '#ff8c00', paddingVertical: 12, borderRadius: 10, alignItems: 'center', marginTop: 8 }
});
