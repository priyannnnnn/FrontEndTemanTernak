import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

const BackgroundDashboard = ({ children }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/pattern.png')}
        style={styles.patternBackground}
        imageStyle={styles.imageStyle}
      />
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  patternBackground: {
    position: 'absolute',
    width: 391.44,
    height: 256.47,
    left: '50%',
    marginLeft: -(391.44 / 2) + 0.72, // (50% - width/2 + offset)
    top: 3.23,
    transform: [{ rotate: '-0.03deg' }],
  },
  imageStyle: {
    borderRadius: 0, // You can adjust if needed
  },
  content: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default BackgroundDashboard;
