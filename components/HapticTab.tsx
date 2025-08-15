import * as Haptics from 'expo-haptics';
import { Pressable, Text, StyleSheet } from 'react-native';

type Props = {
  label: string;
  onPress?: () => void;
};

export function HapticTab({ label, onPress }: Props) {
  return (
    <Pressable
      style={styles.button}
      onPress={() => {
        Haptics.selectionAsync();
        onPress?.();
      }}
    >
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 6,
  },
  text: {
    fontWeight: 'bold',
  },
});
