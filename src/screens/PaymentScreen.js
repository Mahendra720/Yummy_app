import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Modal } from 'react-native';
import ProgressSteps from '../components/ProgressSteps';
import { useCart } from '../context/CartContext';

export default function PaymentScreen({ route, navigation }){
  const [method, setMethod] = useState('card');
  const { state, dispatch } = useCart();
  const subtotal = state.items.reduce((s,i)=> s + i.price*i.qty, 0);
  const [showModal, setShowModal] = useState(false);


const complete = async () => {
  try {
    // get userId from AsyncStorage (or fallback)
    const stored = await AsyncStorage.getItem('userId');
    const userId = stored || "68cf98189cab51b4d1c202f5";

    const orderData = {
      userId,
      items: state.items,
      subtotal,
      paymentMethod: method,
      paymentStatus: method === "cod" ? "Pending" : "Paid",
      createdAt: new Date()
    };

    // IMPORTANT: use correct host for your setup:
    // - Android emulator -> http://10.0.2.2:5000
    // - iOS simulator -> http://localhost:5000
    // - Physical device -> http://<your-pc-local-ip>:5000
    const API = "http://192.168.1.174:5000/api/payment/save"; // change if needed

    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    // read raw text to catch HTML errors from server
    const text = await res.text();
    console.log('Server response (raw):', text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error('Failed to parse JSON from server:', e);
      Alert.alert('Server error', 'Server did not return JSON. See console logs.');
      return;
    }

    if (!res.ok) {
      console.error('Server returned non-OK status', res.status, data);
      Alert.alert('Error', data.error || 'Failed to save payment (server error)');
      return;
    }

    if (data.success) {
      setShowModal(true);
      setTimeout(() => {
        dispatch({ type: "CLEAR" });
        setShowModal(false);
        navigation.replace("OrderComplete");
      }, 1400);
    } else {
      Alert.alert('Error', data.error || 'Failed to save payment');
    }
  } catch (err) {
    console.log("Payment save error:", err);
    Alert.alert('Network error', 'Could not reach server. Check network / server and try again.');
  }
};
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
      <ProgressSteps step={2} total={3} />
      <View style={{padding:12}}>
        <Text style={{fontWeight:'700'}}>Choose your payment method</Text>

        <View style={{marginTop:12}}>
          <TouchableOpacity onPress={()=>setMethod('card')} style={[styles.payOption, method==='card' && styles.payActive]}>
            <Text>Card</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>setMethod('cod')} style={[styles.payOption, method==='cod' && styles.payActive]}>
            <Text>Pay on delivery</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.completeBtn} onPress={complete}>
          <Text style={{color:'#fff', fontWeight:'800'}}>Complete Order</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showModal} transparent animationType="fade">
        <View style={{flex:1, backgroundColor:'rgba(0,0,0,0.45)', alignItems:'center', justifyContent:'center'}}>
          <View style={{backgroundColor:'#fff', padding:20, width:'80%', borderRadius:12, alignItems:'center'}}>
            <View style={{width:72,height:72,borderRadius:72,backgroundColor:'#39b54a',alignItems:'center',justifyContent:'center'}}>
              <Text style={{color:'#fff', fontSize:36}}>✓</Text>
            </View>
            <Text style={{fontWeight:'800', marginTop:12}}>Thank you</Text>
            <Text style={{color:'#666', textAlign:'center', marginTop:8}}>Your order has been placed successfully</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  payOption:{ borderWidth:1, borderColor:'#ddd', padding:12, borderRadius:10, marginTop:10 },
  payActive:{ borderColor:'#39b54a' },
  completeBtn:{ marginTop:20, backgroundColor:'#ff8c00', paddingVertical:14, borderRadius:10, alignItems:'center' }
});
