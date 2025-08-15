// components/ThemedView.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

export function ThemedView({ style, children, ...props }) {
  return (
    <View style={[styles.default, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  default: {
    flex: 1,
    backgroundColor: '#fff', // change later if you want dark mode
  },
});

export default ThemedView;
