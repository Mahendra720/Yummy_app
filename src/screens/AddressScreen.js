// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const BACKEND_URL = "http://192.168.0.237:5000"; // 👈 replace with your backend IP

// export default function AddressScreen({ navigation }) {
//   const [form, setForm] = useState({ name: "", addr: "", city: "", phone: "" });
//   const [subtotal, setSubtotal] = useState(0);
//   const [user, setUser] = useState(null);

//   // Load user + cart from AsyncStorage
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const userData = await AsyncStorage.getItem("user");
//         const cartData = await AsyncStorage.getItem("cart");

//         console.log("📦 Loaded user:", userData);
//         console.log("🛒 Loaded cart:", cartData);

//         if (userData) setUser(JSON.parse(userData));
//         if (cartData) {
//           const parsedCart = JSON.parse(cartData);
//           setSubtotal(parsedCart?.subtotal || 0);
//         }
//       } catch (err) {
//         console.error("❌ Error loading user/cart:", err);
//       }
//     };
//     loadData();
//   }, []);

//   // Save address
//   const handleSaveAddress = async () => {
//     if (!user) {
//       Alert.alert("Error", "User not logged in");
//       return;
//     }

//     if (!form.name || !form.addr || !form.city || !form.phone) {
//       Alert.alert("Error", "All fields are required");
//       return;
//     }

//     try {
//       console.log("➡️ Sending to backend:", {
//         userId: user._id,
//         ...form,
//         subtotal,
//       });

//       const res = await fetch(`${BACKEND_URL}/api/address`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: user._id,
//           ...form,
//           subtotal,
//         }),
//       });

//       const text = await res.text(); // get raw response
//       console.log("📥 Raw response:", text);

//       let data;
//       try {
//         data = JSON.parse(text); // parse only if JSON
//       } catch {
//         throw new Error("Response is not valid JSON");
//       }

//       if (res.ok) {
//         Alert.alert("Success", "Address saved successfully");
//         navigation.navigate("Main");
//       } else {
//         Alert.alert("Error", data.message || "Failed to save address");
//       }
//     } catch (err) {
//       console.error("❌ Save address failed:", err);
//       Alert.alert("Error", "Unable to connect to server");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Delivery Address</Text>

//       <TextInput
//         placeholder="Full Name"
//         style={styles.input}
//         value={form.name}
//         onChangeText={(text) => setForm({ ...form, name: text })}
//       />
//       <TextInput
//         placeholder="Address"
//         style={styles.input}
//         value={form.addr}
//         onChangeText={(text) => setForm({ ...form, addr: text })}
//       />
//       <TextInput
//         placeholder="City"
//         style={styles.input}
//         value={form.city}
//         onChangeText={(text) => setForm({ ...form, city: text })}
//       />
//       <TextInput
//         placeholder="Phone"
//         keyboardType="phone-pad"
//         style={styles.input}
//         value={form.phone}
//         onChangeText={(text) => setForm({ ...form, phone: text })}
//       />

//       <Text style={styles.subtotal}>Subtotal: ₹{subtotal}</Text>

//       <TouchableOpacity style={styles.btn} onPress={handleSaveAddress}>
//         <Text style={styles.btnText}>Save & Continue</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: "#fff" },
//   title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 12,
//   },
//   subtotal: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
//   btn: {
//     backgroundColor: "#ff8c00",
//     padding: 14,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   btnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
// });

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BACKEND_URL = "http://192.168.1.25:5000"; // 👈 replace with your backend IP

export default function AddressScreen({ navigation }) {
  const [form, setForm] = useState({ name: "", addr: "", city: "", phone: "" });
  const [subtotal, setSubtotal] = useState(0);
  const [user, setUser] = useState(null);

  // Load user + cart from AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        const cartData = await AsyncStorage.getItem("cart");

        if (userData) setUser(JSON.parse(userData));
        if (cartData) {
          const parsedCart = JSON.parse(cartData);
          setSubtotal(parsedCart?.subtotal || 0);
        }
      } catch (err) {
        console.error("❌ Error loading user/cart:", err);
      }
    };
    loadData();
  }, []);

  // Save address
  const handleSaveAddress = async () => {
    if (!user) {
      Alert.alert("Error", "User not logged in");
      return;
    }

    if (!form.name || !form.addr || !form.city || !form.phone) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/address`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          ...form,
          subtotal,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert("Success", "Address saved successfully");

        // ✅ Navigate to CheckoutScreen
        navigation.navigate("Checkout", {
          address: data.address, // backend should return saved address
          subtotal,
        });
      } else {
        Alert.alert("Error", data.message || "Failed to save address");
      }
    } catch (err) {
      console.error("❌ Save address failed:", err);
      Alert.alert("Error", "Unable to connect to server");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery Address</Text>

      <TextInput
        placeholder="Full Name"
        style={styles.input}
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
      />
      <TextInput
        placeholder="Address"
        style={styles.input}
        value={form.addr}
        onChangeText={(text) => setForm({ ...form, addr: text })}
      />
      <TextInput
        placeholder="City"
        style={styles.input}
        value={form.city}
        onChangeText={(text) => setForm({ ...form, city: text })}
      />
      <TextInput
        placeholder="Phone"
        keyboardType="phone-pad"
        style={styles.input}
        value={form.phone}
        onChangeText={(text) => setForm({ ...form, phone: text })}
      />

      <Text style={styles.subtotal}>Subtotal: ₹{subtotal}</Text>

      <TouchableOpacity style={styles.btn} onPress={handleSaveAddress}>
        <Text style={styles.btnText}>Save & Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  subtotal: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  btn: {
    backgroundColor: "#ff8c00",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
