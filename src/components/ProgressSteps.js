import React from 'react';
import { View, Text } from 'react-native';

export default function ProgressSteps({step = 1, total = 3}){
  const dots = [];
  for(let i=1;i<=total;i++){
    dots.push(
      <View key={i} style={{
        width: 10, height: 10, borderRadius: 10, marginHorizontal: 6,
        backgroundColor: i <= step ? '#39b54a' : '#ddd'
      }} />
    )
  }
  return (
    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', paddingVertical:12}}>
      {dots}
    </View>
  );
}
