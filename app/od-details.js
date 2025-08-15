// app/od-details.js
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ODDetails() {
  const { qrData } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OD Request Details</Text>
      {qrData ? (
        <Text>Scanned QR Data: {qrData}</Text>
      ) : (
        <Text>No QR data found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
});
