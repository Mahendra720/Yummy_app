// src/screens/PaymentScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  TextInput,
  Alert
} from "react-native";
import ProgressSteps from "../components/ProgressSteps";
import { useCart } from "../context/CartContext";
import axios from "axios";

const API_URL = "http://192.168.1.7:5000/api"; // update to your backend IP

export default function PaymentScreen({ route, navigation }) {
  // route.params should contain { address, userId }
  const { address = {}, userId = 1 } = route.params ?? {};
  const { state, dispatch } = useCart();

  const [method, setMethod] = useState("card"); // send lowercase values
  const [cardNumber, setCardNumber] = useState("");
  const [showModal, setShowModal] = useState(false);

  const subtotal = state.items.reduce((s, i) => s + (i.price || 0) * (i.qty || 1), 0);

  const completeOrder = async () => {
    // validate card if chosen
    if (method === "card" && (!cardNumber || cardNumber.trim().length < 8)) {
      Alert.alert("Error", "Please enter a valid card number");
      return;
    }

    try {
      const orderPayload = {
        userId,
        items: state.items.map(i => ({
          id: i.id,
          title: i.title,
          price: i.price,
          qty: i.qty,
        })),
        address: {
          name: address.name || "",
          addr: address.addr || "",
          city: address.city || "",
          phone: address.phone || ""
        },
        paymentMethod: method, // "card" or "cod"
        cardNumber: method === "card" ? cardNumber : undefined,
        total: subtotal
      };

      console.log("📦 Sending order:", orderPayload);

      const res = await axios.post(`${API_URL}/orders`, orderPayload);

      if (res.data && res.data.success) {
        setShowModal(true);
        setTimeout(() => {
          dispatch({ type: "CLEAR" });
          setShowModal(false);
          navigation.replace("OrderComplete");
        }, 1400);
      } else {
        Alert.alert("Order Failed", res.data?.message || "Unknown response");
      }
    } catch (err) {
      console.error("Order POST error:", err.response?.data || err.message);
      Alert.alert("Order Failed", err.response?.data?.message || err.message || "Network / Server error");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ProgressSteps step={2} total={3} />
      <View style={{ padding: 16 }}>
        <Text style={{ fontWeight: "700", fontSize: 16 }}>Choose payment</Text>

        <TouchableOpacity
          style={[styles.option, method === "card" && styles.active]}
          onPress={() => setMethod("card")}
        >
          <Text>💳 Card</Text>
        </TouchableOpacity>

        {method === "card" && (
          <TextInput
            style={styles.input}
            placeholder="Enter card number"
            keyboardType="number-pad"
            value={cardNumber}
            onChangeText={setCardNumber}
          />
        )}

        <TouchableOpacity
          style={[styles.option, method === "cod" && styles.active]}
          onPress={() => setMethod("cod")}
        >
          <Text>🚚 Cash on Delivery</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cta} onPress={completeOrder}>
          <Text style={{ color: "#fff", fontWeight: "800" }}>Complete Order</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.checkCircle}><Text style={styles.check}>✓</Text></View>
            <Text style={{ fontWeight: "800", marginTop: 12 }}>Thank you</Text>
            <Text style={{ color: "#666", textAlign: "center", marginTop: 8 }}>Your order has been placed successfully</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  option: { marginTop: 12, borderWidth: 1, borderColor: "#ddd", padding: 12, borderRadius: 10 },
  active: { borderColor: "#39b54a", backgroundColor: "#f7fff5" },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 12, borderRadius: 8, marginTop: 12 },
  cta: { marginTop: 20, backgroundColor: "#ff8c00", padding: 14, borderRadius: 10, alignItems: "center" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.45)", alignItems: "center", justifyContent: "center" },
  modalBox: { backgroundColor: "#fff", padding: 20, width: "80%", borderRadius: 12, alignItems: "center" },
  checkCircle: { width: 72, height: 72, borderRadius: 72, backgroundColor: "#39b54a", alignItems: "center", justifyContent: "center" },
  check: { color: "#fff", fontSize: 36, fontWeight: "700" }
});
