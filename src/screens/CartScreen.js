import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useCart } from '../context/CartContext';

export default function CartScreen({ navigation }){
  const { state, dispatch } = useCart();
  const items = state.items;
  const subtotal = items.reduce((s,i)=> s + i.price*i.qty, 0);

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
      <View style={{padding:16, borderBottomWidth:1, borderColor:'#eee'}}>
        <Text style={{fontSize:20, fontWeight:'900'}}>Order summary</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={i => i.id}
        contentContainerStyle={{padding:12}}
        renderItem={({item}) => (
          <View style={styles.row}>
            <View style={{flex:1}}>
              <Text style={{fontWeight:'800'}}>{item.title}</Text>
              <Text style={{color:'#666', marginTop:6}}>₹ {item.price} × {item.qty}</Text>
            </View>
            <View style={{alignItems:'center'}}>
              <TouchableOpacity style={styles.qBtn} onPress={()=>dispatch({type:'INCREMENT', payload:item.id})}><Text>+</Text></TouchableOpacity>
              <Text style={{marginVertical:8}}>{item.qty}</Text>
              <TouchableOpacity style={styles.qBtn} onPress={()=>dispatch({type:'DECREMENT', payload:item.id})}><Text>-</Text></TouchableOpacity>
              <TouchableOpacity onPress={()=>dispatch({type:'REMOVE', payload:item.id})}><Text style={{color:'#ff4d4f'}}>Remove</Text></TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<View style={{padding:20}}><Text>Your cart is empty</Text></View>}
      />

      <View style={styles.footer}>
        <View>
          <Text style={{fontSize:14}}>Subtotal:</Text>
          <Text style={{fontSize:18, fontWeight:'900'}}>₹ {subtotal}</Text>
        </View>

        <TouchableOpacity style={styles.checkoutBtn} onPress={()=>navigation.navigate('Address')}>
          <Text style={{color:'#fff', fontWeight:'800'}}>Proceed to Address</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row:{ backgroundColor:'#fafafa', padding:12, borderRadius:8, marginBottom:12, flexDirection:'row' },
  qBtn:{ width:36, height:36, borderRadius:8, backgroundColor:'#fff', alignItems:'center', justifyContent:'center', borderWidth:1, borderColor:'#ddd' },
  footer:{ padding:16, borderTopWidth:1, borderColor:'#eee', flexDirection:'row', justifyContent:'space-between', alignItems:'center' },
  checkoutBtn:{ backgroundColor:'#ff8c00', paddingVertical:12, paddingHorizontal:16, borderRadius:10 }
});
