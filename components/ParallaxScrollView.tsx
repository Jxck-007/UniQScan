import React from 'react';
import { ScrollView, View, Image, StyleSheet } from 'react-native';

type Props = {
  children: React.ReactNode;
  headerImage: any;
};

export function ParallaxScrollView({ children, headerImage }: Props) {
  return (
    <ScrollView style={styles.container}>
      <Image source={headerImage} style={styles.header} />
      <View style={styles.content}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { width: '100%', height: 200, resizeMode: 'cover' },
  content: { padding: 16 },
});
