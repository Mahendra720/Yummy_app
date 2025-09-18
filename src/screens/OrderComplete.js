import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function OrderComplete({ navigation }){
  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'#fff'}}>
      <View style={{width:120,height:120,borderRadius:120,backgroundColor:'#39b54a',alignItems:'center',justifyContent:'center'}}>
        <Text style={{color:'#fff', fontSize:44}}>✓</Text>
      </View>
      <Text style={{fontWeight:'800', fontSize:22, marginTop:18}}>Thank you</Text>
      <Text style={{color:'#666', marginTop:6}}>Your order was placed successfully</Text>

      <TouchableOpacity style={styles.btn} onPress={()=>navigation.replace('Main')}>
        <Text style={{color:'#fff', fontWeight:'800'}}>Back to home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn:{ marginTop:24, backgroundColor:'#ff8c00', paddingVertical:12, paddingHorizontal:20, borderRadius:12 }
});
