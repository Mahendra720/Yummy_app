// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// export default function OrderComplete({ navigation }){
//   return (
//     <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'#fff'}}>
//       <View style={{width:120,height:120,borderRadius:120,backgroundColor:'#39b54a',alignItems:'center',justifyContent:'center'}}>
//         <Text style={{color:'#fff', fontSize:44}}>✓</Text>
//       </View>
//       <Text style={{fontWeight:'800', fontSize:22, marginTop:18}}>Thank you</Text>
//       <Text style={{color:'#666', marginTop:6}}>Your order was placed successfully</Text>

//       <TouchableOpacity style={styles.btn} onPress={()=>navigation.replace('Main')}>
//         <Text style={{color:'#fff', fontWeight:'800'}}>Back to home</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   btn:{ marginTop:24, backgroundColor:'#ff8c00', paddingVertical:12, paddingHorizontal:20, borderRadius:12 }
// });
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BACKEND_URL = "http://192.168.1.25:5000"; // 👈 use your backend IP

export default function OrderComplete({ route, navigation }) {
  const { address, items, subtotal, paymentMethod, user } = route.params || {};

  useEffect(() => {
    const saveOrder = async () => {
      try {
        if (!user || !items || items.length === 0) {
          console.warn("⚠️ Missing order details, not saving to DB");
          return;
        }

        const res = await fetch(`${BACKEND_URL}/api/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user._id,
            items,
            subtotal,
            address,
            paymentMethod,
          }),
        });

        const data = await res.json();
        if (res.ok) {
          console.log("✅ Order stored in DB:", data);
          await AsyncStorage.removeItem("cart"); // clear local cart
        } else {
          console.error("❌ Failed to store order:", data);
          Alert.alert("Error", data.message || "Could not save order");
        }
      } catch (err) {
        console.error("❌ Order save error:", err);
      }
    };

    saveOrder();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          width: 120,
          height: 120,
          borderRadius: 120,
          backgroundColor: "#39b54a",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 44 }}>✓</Text>
      </View>
      <Text style={{ fontWeight: "800", fontSize: 22, marginTop: 18 }}>
        Thank you
      </Text>
      <Text style={{ color: "#666", marginTop: 6 }}>
        Your order was placed successfully
      </Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.replace("Main")}
      >
        <Text style={{ color: "#fff", fontWeight: "800" }}>Back to home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginTop: 24,
    backgroundColor: "#ff8c00",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
});
