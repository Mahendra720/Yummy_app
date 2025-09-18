import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { fetchProducts } from '../api/mockApi';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

export default function HomeScreen({ navigation }){
  const [products, setProducts] = useState([]);
  const { dispatch } = useCart();
  useEffect(()=>{ fetchProducts(24).then(setProducts); },[]);
  const handleAdd = (item) => dispatch({type:'ADD_ITEM', payload: item});
  const openDetails = (item) => navigation.navigate('ProductDetails', { product: item });

  return (
    <View style={{flex:1, backgroundColor:'#f7f7f8'}}>
      <View style={{padding:12}}>
        <Text style={{color:'#666'}}>Hello Chinwe</Text>
        <Text style={{fontSize:26, fontWeight:'900'}}>What would you like to <Text style={{color:'#ff8c00'}}>Eat?</Text></Text>
      </View>

      <View style={{paddingHorizontal:12}}>
        <View style={{backgroundColor:'#fff', padding:12, borderRadius:12, marginBottom:12, flexDirection:'row', alignItems:'center'}}>
          <Text style={{flex:1, color:'#999'}}>Search your dish name</Text>
          <TouchableOpacity style={{backgroundColor:'#ff8c00', padding:8, borderRadius:8}}>
            <Text style={{color:'#fff'}}>Go</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        contentContainerStyle={{ paddingHorizontal:12, paddingTop:6 }}
        data={products}
        keyExtractor={i => i.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent:'space-between' }}
        renderItem={({item}) => (
          <ProductCard item={item} onAdd={handleAdd} onPress={openDetails} />
        )}
      />
    </View>
  );
}
