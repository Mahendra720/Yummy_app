// // src/screens/CheckoutScreen.js
// import React from 'react';
// import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
// import { useCart } from '../context/CartContext';
// import ProgressSteps from '../components/ProgressSteps';

// export default function CheckoutScreen({ route, navigation }) {
//   const { state } = useCart();
//   const { address } = route.params || {};
//   const items = state.items;
//   const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
//       <ProgressSteps step={3} total={3} />
//       <View style={{ padding: 16 }}>
//         <Text style={{ fontSize: 20, fontWeight: '900' }}>Review Order</Text>
//       </View>

//       <FlatList
//         data={items}
//         keyExtractor={i => i.id}
//         contentContainerStyle={{ paddingHorizontal: 16 }}
//         renderItem={({ item }) => (
//           <View style={styles.row}>
//             <Text style={{ flex: 1 }}>{item.title} × {item.qty}</Text>
//             <Text style={{ fontWeight: '700' }}>₹ {item.price * item.qty}</Text>
//           </View>
//         )}
//         ListEmptyComponent={<Text style={{ padding: 20 }}>Cart is empty</Text>}
//       />

//       {address && (
//         <View style={styles.addressBox}>
//           <Text style={{ fontWeight: '700' }}>Delivery Address</Text>
//           <Text>{address.name}</Text>
//           <Text>{address.addr}, {address.city}</Text>
//           <Text>{address.phone}</Text>
//         </View>
//       )}

//       <View style={styles.footer}>
//         <Text style={{ fontSize: 16, fontWeight: '900' }}>Total: ₹ {subtotal}</Text>
//         <TouchableOpacity
//           style={styles.btn}
//           onPress={() => navigation.navigate('Payment', { address })}
//         >
//           <Text style={{ color: '#fff', fontWeight: '800' }}>Proceed to Payment</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderColor: '#eee',
//   },
//   addressBox: {
//     margin: 16,
//     padding: 12,
//     backgroundColor: '#fafafa',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#eee',
//   },
//   footer: {
//     padding: 16,
//     borderTopWidth: 1,
//     borderColor: '#eee',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   btn: {
//     backgroundColor: '#ff8c00',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 10,
//   },
// });
// src/screens/CheckoutScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useCart } from "../context/CartContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProgressSteps from "../components/ProgressSteps";

export default function CheckoutScreen({ route, navigation }) {
  const { state } = useCart();
  const { address } = route.params || {};
  const items = state.items;
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  const [user, setUser] = useState(null);

  // Load user
  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (userData) setUser(JSON.parse(userData));
    };
    loadUser();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ProgressSteps step={3} total={4} /> 
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: "900" }}>Review Order</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(i) => i.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={{ flex: 1 }}>
              {item.title} × {item.qty}
            </Text>
            <Text style={{ fontWeight: "700" }}>
              ₹ {item.price * item.qty}
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{ padding: 20 }}>Cart is empty</Text>}
      />

      {address && (
        <View style={styles.addressBox}>
          <Text style={{ fontWeight: "700" }}>Delivery Address</Text>
          <Text>{address.name}</Text>
          <Text>
            {address.addr}, {address.city}
          </Text>
          <Text>{address.phone}</Text>
        </View>
      )}

      <View style={styles.footer}>
        <Text style={{ fontSize: 16, fontWeight: "900" }}>
          Total: ₹ {subtotal}
        </Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            navigation.navigate("Payment", {
              user,
              items,
              subtotal,
              address,
            })
          }
        >
          <Text style={{ color: "#fff", fontWeight: "800" }}>
            Proceed to Payment
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  addressBox: {
    margin: 16,
    padding: 12,
    backgroundColor: "#fafafa",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#ff8c00",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
});
