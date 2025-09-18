import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProductCard({ item, onAdd, onPress }){
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={()=>onPress(item)} style={{flex:1}}>
        <Image source={item.image} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.body}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>₹ {item.price}</Text>
        <TouchableOpacity onPress={()=>onAdd(item)} style={styles.btn}>
          <Text style={styles.btnText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card:{ width:'48%', backgroundColor:'#fff', borderRadius:12, marginBottom:12, overflow:'hidden', borderWidth:1, borderColor:'#eee' },
  image:{ width:'100%', height:110 },
  body:{ padding:8, alignItems:'center' },
  title:{ fontWeight:'700', fontSize:13, textAlign:'center' },
  price:{ marginTop:6, color:'#333', fontWeight:'700' },
  btn:{ marginTop:8, backgroundColor:'#ff8c00', paddingVertical:8, paddingHorizontal:14, borderRadius:8 },
  btnText:{ color:'#fff', fontWeight:'700' }
});
