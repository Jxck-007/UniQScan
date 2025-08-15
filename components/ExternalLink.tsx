import { Text, Pressable, Linking } from 'react-native';

type Props = {
  href: string;
  children: React.ReactNode;
};

export function ExternalLink({ href, children }: Props) {
  return (
    <Pressable onPress={() => Linking.openURL(href)}>
      <Text style={{ color: '#007AFF' }}>{children}</Text>
    </Pressable>
  );
}
