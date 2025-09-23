// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
// } from "react-native";
// import { useCart } from "../context/CartContext";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function CartScreen({ navigation }) {
//   const { state, dispatch } = useCart();
//   const items = state.items;
//   const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

//   // Save cart in AsyncStorage so AddressScreen can use it
//   useEffect(() => {
//     const saveCart = async () => {
//       try {
//         await AsyncStorage.setItem(
//           "cart",
//           JSON.stringify({ items, subtotal })
//         );
//         console.log("🛒 Cart saved:", { items, subtotal });
//       } catch (err) {
//         console.error("❌ Error saving cart:", err);
//       }
//     };
//     if (items.length > 0) saveCart();
//   }, [items, subtotal]);

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
//       {/* Header */}
//       <View style={{ padding: 16, borderBottomWidth: 1, borderColor: "#eee" }}>
//         <Text style={{ fontSize: 20, fontWeight: "900" }}>Order summary</Text>
//       </View>

//       {/* Cart List */}
//       <FlatList
//         data={items}
//         keyExtractor={(i) => i.id.toString()}
//         contentContainerStyle={{ padding: 12, flexGrow: 1 }}
//         renderItem={({ item }) => (
//           <View style={styles.row}>
//             <View style={{ flex: 1 }}>
//               <Text style={{ fontWeight: "800" }}>{item.title}</Text>
//               <Text style={{ color: "#666", marginTop: 6 }}>
//                 ₹ {item.price} × {item.qty}
//               </Text>
//             </View>
//             <View style={{ alignItems: "center" }}>
//               <TouchableOpacity
//                 style={styles.qBtn}
//                 onPress={() => dispatch({ type: "INCREMENT", payload: item.id })}
//               >
//                 <Text>+</Text>
//               </TouchableOpacity>
//               <Text style={{ marginVertical: 8 }}>{item.qty}</Text>
//               <TouchableOpacity
//                 style={styles.qBtn}
//                 onPress={() => dispatch({ type: "DECREMENT", payload: item.id })}
//               >
//                 <Text>-</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => dispatch({ type: "REMOVE", payload: item.id })}
//               >
//                 <Text style={{ color: "#ff4d4f" }}>Remove</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//         ListEmptyComponent={
//           <View style={{ padding: 20 }}>
//             <Text>Your cart is empty</Text>
//           </View>
//         }
//       />

//       {/* Footer with Subtotal & Button */}
//       <View style={styles.footer}>
//         <View>
//           <Text style={{ fontSize: 14 }}>Subtotal:</Text>
//           <Text style={{ fontSize: 18, fontWeight: "900" }}>₹ {subtotal}</Text>
//         </View>

//         <TouchableOpacity
//           style={styles.checkoutBtn}
//           disabled={items.length === 0}
//           onPress={() => navigation.navigate("Address")}
//         >
//           <Text style={{ color: "#fff", fontWeight: "800" }}>
//             Proceed to Address
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   row: {
//     backgroundColor: "#fafafa",
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 12,
//     flexDirection: "row",
//   },
//   qBtn: {
//     width: 36,
//     height: 36,
//     borderRadius: 8,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   footer: {
//     padding: 16,
//     borderTopWidth: 1,
//     borderColor: "#eee",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   checkoutBtn: {
//     backgroundColor: "#ff8c00",
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 10,
//   },
// });

// import React, { useEffect } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
// } from "react-native";
// import { useCart } from "../context/CartContext";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const BACKEND_URL = "http://192.168.1.26:5000"; // ⚡ replace with your PC IP + backend port

// export default function CartScreen({ navigation }) {
//   const { state, dispatch } = useCart();
//   const items = state.items;
//   const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

//   // Save cart in AsyncStorage + send to backend
//   useEffect(() => {
//     const saveCart = async () => {
//       try {
//         // get logged-in user
//         const userStr = await AsyncStorage.getItem("user");
//         if (!userStr) {
//           console.log("❌ No user found in storage");
//           return;
//         }
//         const user = JSON.parse(userStr);

//         // Save locally
//         await AsyncStorage.setItem(
//           "cart",
//           JSON.stringify({ items, subtotal })
//         );
//         console.log("🛒 Cart saved locally:", { items, subtotal });

//         // Save to MongoDB
//         const res = await fetch(`${BACKEND_URL}/api/cart`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             userId: user._id, // comes from backend signup/login
//             items,
//             subtotal,
//           }),
//         });

//         const data = await res.json();
//         console.log("✅ Cart saved to DB:", data);
//       } catch (err) {
//         console.error("❌ Error saving cart:", err);
//       }
//     };

//     if (items.length > 0) saveCart();
//   }, [items, subtotal]);

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
//       {/* Header */}
//       <View style={{ padding: 16, borderBottomWidth: 1, borderColor: "#eee" }}>
//         <Text style={{ fontSize: 20, fontWeight: "900" }}>Order summary</Text>
//       </View>

//       {/* Cart List */}
//       <FlatList
//         data={items}
//         keyExtractor={(i) => i.id.toString()}
//         contentContainerStyle={{ padding: 12, flexGrow: 1 }}
//         renderItem={({ item }) => (
//           <View style={styles.row}>
//             <View style={{ flex: 1 }}>
//               <Text style={{ fontWeight: "800" }}>{item.title}</Text>
//               <Text style={{ color: "#666", marginTop: 6 }}>
//                 ₹ {item.price} × {item.qty}
//               </Text>
//             </View>
//             <View style={{ alignItems: "center" }}>
//               <TouchableOpacity
//                 style={styles.qBtn}
//                 onPress={() => dispatch({ type: "INCREMENT", payload: item.id })}
//               >
//                 <Text>+</Text>
//               </TouchableOpacity>
//               <Text style={{ marginVertical: 8 }}>{item.qty}</Text>
//               <TouchableOpacity
//                 style={styles.qBtn}
//                 onPress={() => dispatch({ type: "DECREMENT", payload: item.id })}
//               >
//                 <Text>-</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => dispatch({ type: "REMOVE", payload: item.id })}
//               >
//                 <Text style={{ color: "#ff4d4f" }}>Remove</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//         ListEmptyComponent={
//           <View style={{ padding: 20 }}>
//             <Text>Your cart is empty</Text>
//           </View>
//         }
//       />

//       {/* Footer */}
//       <View style={styles.footer}>
//         <View>
//           <Text style={{ fontSize: 14 }}>Subtotal:</Text>
//           <Text style={{ fontSize: 18, fontWeight: "900" }}>₹ {subtotal}</Text>
//         </View>

//         <TouchableOpacity
//           style={styles.checkoutBtn}
//           disabled={items.length === 0}
//           onPress={() => navigation.navigate("Address")}
//         >
//           <Text style={{ color: "#fff", fontWeight: "800" }}>
//             Proceed to Address
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   row: {
//     backgroundColor: "#fafafa",
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 12,
//     flexDirection: "row",
//   },
//   qBtn: {
//     width: 36,
//     height: 36,
//     borderRadius: 8,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   footer: {
//     padding: 16,
//     borderTopWidth: 1,
//     borderColor: "#eee",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   checkoutBtn: {
//     backgroundColor: "#ff8c00",
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 10,
//   },
// });
import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useCart } from "../context/CartContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BACKEND_URL = "http://192.168.1.25:5000"; // ⚡ your backend IP

export default function CartScreen({ navigation }) {
  const { state, dispatch } = useCart();
  const items = state.items;
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  // Save cart in DB + AsyncStorage whenever items change
  useEffect(() => {
    const saveCart = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (!userData) {
          console.log("⚠️ No user logged in, cannot save cart");
          return;
        }
        const user = JSON.parse(userData);

        const payload = {
          userId: user._id,
          items: items.map((i) => ({
            id: i.id,
            title: i.title,
            price: i.price,
            qty: i.qty,
          })), // ✅ structured cart
          subtotal,
        };

        const res = await fetch(`${BACKEND_URL}/api/cart`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (res.ok) {
          console.log("✅ Cart saved to DB:", data.cart);
          await AsyncStorage.setItem("cart", JSON.stringify(data.cart));
        } else {
          console.error("❌ Cart save failed:", data.message);
        }
      } catch (err) {
        console.error("❌ Error saving cart:", err);
      }
    };

    if (items.length > 0) saveCart();
  }, [items, subtotal]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={{ padding: 16, borderBottomWidth: 1, borderColor: "#eee" }}>
        <Text style={{ fontSize: 20, fontWeight: "900" }}>Order summary</Text>
      </View>

      {/* Cart List */}
      <FlatList
        data={items}
        keyExtractor={(i) => i.id.toString()}
        contentContainerStyle={{ padding: 12, flexGrow: 1 }}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "800" }}>{item.title}</Text>
              <Text style={{ color: "#666", marginTop: 6 }}>
                ₹ {item.price} × {item.qty}
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={styles.qBtn}
                onPress={() => dispatch({ type: "INCREMENT", payload: item.id })}
              >
                <Text>+</Text>
              </TouchableOpacity>
              <Text style={{ marginVertical: 8 }}>{item.qty}</Text>
              <TouchableOpacity
                style={styles.qBtn}
                onPress={() => dispatch({ type: "DECREMENT", payload: item.id })}
              >
                <Text>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => dispatch({ type: "REMOVE", payload: item.id })}
              >
                <Text style={{ color: "#ff4d4f" }}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={{ padding: 20 }}>
            <Text>Your cart is empty</Text>
          </View>
        }
      />

      {/* Footer with Subtotal & Button */}
      <View style={styles.footer}>
        <View>
          <Text style={{ fontSize: 14 }}>Subtotal:</Text>
          <Text style={{ fontSize: 18, fontWeight: "900" }}>₹ {subtotal}</Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutBtn}
          disabled={items.length === 0}
          onPress={() => navigation.navigate("Address")}
        >
          <Text style={{ color: "#fff", fontWeight: "800" }}>
            Proceed to Address
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: "#fafafa",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: "row",
  },
  qBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkoutBtn: {
    backgroundColor: "#ff8c00",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
});
