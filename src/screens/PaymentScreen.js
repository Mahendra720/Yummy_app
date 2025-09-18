import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Modal } from 'react-native';
import ProgressSteps from '../components/ProgressSteps';
import { useCart } from '../context/CartContext';

export default function PaymentScreen({ route, navigation }){
  const [method, setMethod] = useState('card');
  const { state, dispatch } = useCart();
  const subtotal = state.items.reduce((s,i)=> s + i.price*i.qty, 0);
  const [showModal, setShowModal] = useState(false);

  const complete = ()=> {
    setShowModal(true);
    setTimeout(()=>{
      dispatch({type:'CLEAR'});
      setShowModal(false);
      navigation.replace('OrderComplete');
    }, 1400);
  }

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
