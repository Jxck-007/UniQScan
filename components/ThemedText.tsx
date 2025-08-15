// components/ThemedText.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';

export function ThemedText({ style, type, children, ...props }) {
  let textStyle = styles.default;

  if (type === 'title') {
    textStyle = styles.title;
  } else if (type === 'link') {
    textStyle = styles.link;
  }

  return (
    <Text style={[textStyle, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    color: '#000',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  link: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default ThemedText;
