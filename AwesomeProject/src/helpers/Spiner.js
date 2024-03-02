import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const Spinner = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#0079FF" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#00ff9d',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Spinner;