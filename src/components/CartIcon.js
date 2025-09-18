import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

export default function CartIcon({ navigation }){
  const { state } = useCart();
  const count = state.items.reduce((s,i)=> s + i.qty, 0);
  return (
    <TouchableOpacity style={{marginRight:12}} onPress={()=>navigation.navigate('Cart')}>
      <View>
        <Ionicons name="cart-outline" size={24} />
        {count > 0 && (
          <View style={{position:'absolute', right:-6, top:-6, backgroundColor:'#ff4d4f', borderRadius:10, paddingHorizontal:6}}>
            <Text style={{color:'#fff', fontSize:12, fontWeight:'700'}}>{count}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
