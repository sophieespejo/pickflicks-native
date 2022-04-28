import React from 'react';
import { Text, View, StyleSheet, Image} from 'react-native';
import { COLORS } from '../Utilities/Utility';


export default function Choice({ type }:any) {
  const color = COLORS[type];

  return (
    <View style={[{ borderColor: color }]}>
      <Image source={type} style={[styles.text, { color }]}/>
    </View>
  );
}

export const styles = StyleSheet.create({
    container: {
      // borderWidth: 7,
      borderRadius: 15,
      // backgroundColor: 'rgba(0,0,0,0.2)',
    },
    text: {
      width:80,
      height:80,
      resizeMode:'stretch'
    },
  });