import { Image, StyleSheet } from "react-native";
import React from "react";

export default function LogoStartScreen(){
    return <Image source={require('../assets/logo2.png')} style={styles.image}/>
}

const styles=StyleSheet.create({
    image:{
    width: 400,
    height: 200,
    marginBottom: 20,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center'

    }
})