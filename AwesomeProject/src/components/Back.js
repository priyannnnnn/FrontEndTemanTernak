import React from "react";
import { ImageBackground, StyleSheet, KeyboardAvoidingView, View } from 'react-native'

export default function Back({children}) {
    <View style={styles.view}>
        <View style={styles.background}>

        </View>
        <KeyboardAvoidingView style={styles.container}behavior="height">
        {children}
      </KeyboardAvoidingView>
    </View>
}
const styles= StyleSheet.create({
    view: {
        flex:1
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
      background: {
        flex: 1,
        width: '100%',
      }
})