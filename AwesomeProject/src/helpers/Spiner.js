import React from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';

const Spinner = () => (
  <View style={styles.icon}>
    {/* <View style={styles.icon}>
      <Image source={require('../assets/any-farm-logo.png')}/>
    </View> */}
    <View style={styles.container}>
    <ActivityIndicator size="large" color="#0079FF" />
    <Image source={require('../assets/logo2.png')} style={{width:150,height:150}}/>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#00ff9d',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    // alignContent:'center',
    // justifyContent:'center',
    // textAlign:'center',
    // width:20,
    // height:10,
    backgroundColor:'#00ff9d',
    flex: 1,
  }
});

export default Spinner;