import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolView, SymbolViewProps } from 'expo-symbols';
import { Platform } from 'react-native';

type Props = {
  name: string;
  size?: number;
  color?: string;
};

export function IconSymbol({ name, size = 24, color = '#000' }: Props) {
  if (Platform.OS === 'ios') {
    return <SymbolView name={name as SymbolViewProps['name']} style={{ width: size, height: size, tintColor: color }} />;
  }
  return <MaterialIcons name={name as any} size={size} color={color} />;
}
