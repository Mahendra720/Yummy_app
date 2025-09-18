import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useCart } from '../context/CartContext';

export default function ProductDetails({ route, navigation }){
  const { product } = route.params;
  const { dispatch } = useCart();
  return (
    <SafeAreaView style={{flex:1}}>
      <Image source={product.image} style={{width:'100%', height:260}} />
      <View style={{padding:16}}>
        <Text style={{fontSize:20, fontWeight:'900'}}>{product.title}</Text>
        <Text style={{marginTop:8, color:'#666'}}>{product.description}</Text>
        <Text style={{marginTop:12, fontSize:18, fontWeight:'900'}}>N{product.price}</Text>
        <View style={{flexDirection:'row', marginTop:18}}>
          <TouchableOpacity style={styles.btn} onPress={()=>{dispatch({type:'ADD_ITEM', payload:product}); navigation.navigate('Cart');}}>
            <Text style={{color:'#fff', fontWeight:'800'}}>Add to cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btn:{ backgroundColor:'#ff8c00', paddingVertical:12, paddingHorizontal:20, borderRadius:10 }
});
