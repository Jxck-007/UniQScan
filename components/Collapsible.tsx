import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { IconSymbol } from './ui/IconSymbol';

type Props = {
  children: React.ReactNode;
  title: string;
};

export function Collapsible({ children, title }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.8}
      >
        <IconSymbol name={isOpen ? 'expand-less' : 'expand-more'} size={18} color="#000" />
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f5f5f5',
  },
  title: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    padding: 12,
    backgroundColor: '#fff',
  },
});
