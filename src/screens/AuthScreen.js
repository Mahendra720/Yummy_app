import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function AuthScreen({ navigation }){
  const [mode, setMode] = useState('signin');
  return (
    <View style={{flex:1, padding:18, backgroundColor:'#ffffffff'}}>
      <View style={{flexDirection:'row', justifyContent:'center', marginTop:200}}>
        <TouchableOpacity onPress={()=>setMode('signin')}><Text style={[styles.tab, mode==='signin' && styles.active]}>sign in</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>setMode('signup')}><Text style={[styles.tab, mode==='signup' && styles.active]}>sign up</Text></TouchableOpacity>
      </View>

      <View style={{marginTop:30}}>
        {mode==='signin' ? (
          <>
            <TextInput placeholder="Email Address" style={styles.input} />
            <TextInput placeholder="Enter Password" secureTextEntry style={styles.input} />
            <TouchableOpacity style={styles.primaryBtn} onPress={()=>navigation.replace('Main')}>
              <Text style={{color:'#fff', fontWeight:'800'}}>Login</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput placeholder="Full name" style={styles.input} />
            <TextInput placeholder="Email address" style={styles.input} />
            <TextInput placeholder="Create password" secureTextEntry style={styles.input} />
            <TouchableOpacity style={styles.primaryBtn} onPress={()=>navigation.navigate('Main')}>
              <Text style={{color:'#fff', fontWeight:'800'}}>create account</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tab:{ marginHorizontal:18, paddingVertical:6, fontSize:16, color:'#ff8c00' },
  active:{ borderBottomWidth:2, borderColor:'#ff8c00' },
  input:{ borderWidth:1, borderColor:'#ddd', padding:10, borderRadius:8, marginBottom:12 },
  primaryBtn:{ backgroundColor:'#ff8c00', paddingVertical:12, borderRadius:12, alignItems:'center' }
});
