import { Text, View, StyleSheet } from 'react-native';

export function HelloWave() {
  return (
    <View style={styles.container}>
      <Text style={styles.wave}>👋</Text>
      <Text>Hello!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wave: {
    marginRight: 6,
    fontSize: 24,
  },
});
