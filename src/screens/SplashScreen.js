import React, {useEffect} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';

export default function SplashScreen({ navigation }){
  useEffect(()=>{
    const t = setTimeout(()=> navigation.replace('Auth'), 3000);
    return ()=>clearTimeout(t);
  },[]);

  return (
    <ImageBackground source={{uri:'https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D'}} style={styles.bg}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Yummies</Text>
        <Text style={styles.sub}>tasty meals delivered to your doorstep</Text>
        <TouchableOpacity style={styles.btn} onPress={()=>navigation.replace('Auth')}>
          <Text style={{color:'#fff', fontWeight:'800'}}>Get started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg:{ flex:1, resizeMode:'cover', justifyContent:'center', alignItems:'center' },
  overlay:{ backgroundColor:'rgba(0,0,0,0.45)', padding:24, borderRadius:14, alignItems:'center' },
  title:{ color:'#fff', fontSize:28, fontWeight:'900' },
  sub:{ color:'#fff', marginTop:8, textAlign:'center' },
  btn:{ marginTop:18, backgroundColor:'#ff8c00', paddingVertical:12, paddingHorizontal:28, borderRadius:14 }
});
