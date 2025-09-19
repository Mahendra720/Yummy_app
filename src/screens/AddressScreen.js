import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';

export default function AddressScreen({ navigation }) {
  const [form, setForm] = useState({ name: '', addr: '', city: '', phone: '' });

  const handleProceed = () => {
    // Validation
    if (!form.name || !form.addr || !form.city || !form.phone) {
      return Alert.alert('Error', 'All fields are required');
    }

    if (!/^\d{10}$/.test(form.phone)) {
      return Alert.alert('Error', 'Phone number must be 10 digits');
    }

    // If valid, navigate to Checkout
    navigation.navigate('Checkout', { address: form });
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

        <TouchableOpacity style={styles.primaryBtn} onPress={handleProceed}>
          <Text style={{ color: '#fff', fontWeight: '800' }}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 12 },
  primaryBtn: { backgroundColor: '#ff8c00', paddingVertical: 12, borderRadius: 10, alignItems: 'center', marginTop: 8 },
});
