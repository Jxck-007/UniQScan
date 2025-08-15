// app/student.js
import { View, Text, StyleSheet } from "react-native";

export default function Student() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Student Dashboard</Text>
      <Text>Request for OD</Text>
      <Text>View My Office QR</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 22, fontWeight: "bold" },
});
