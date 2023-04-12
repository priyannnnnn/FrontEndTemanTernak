import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView, View } from 'react-native'
import { theme } from '../core/theme';
import { Image, } from 'react-native';

const warna={
  primary:'#EBF4',
  primary1:'#'
}
export default function Background({ children }) {
  return (
    <View style={styles.ff}>
    {/* <ImageBackground
      resizeMode="cover"
      source={require('../assets/1234.jpg')}
      style={styles.background}
      imageStyle={styles.r}
    > */}
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
      
    {/* </ImageBackground> */}
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor:'#FAEBD7',
    
  },
  container: {
    flex: 1,
    padding: 40,
    width: '100%',
    maxWidth: 3500,
    alignSelf: 'center',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  ff:{
    color:'#EBF4FA',
    flex:1,
    backgroundColor:'#FAEBD7'
  },
  r:{
    opacity:0.85
  }

})
