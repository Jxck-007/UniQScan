// app/staff.js
import { View, Text, Button, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function StaffDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Staff Dashboard</Text>

      <Link href="/staff-od-approval" asChild>
        <Button title="View OD Requests" />
      </Link>

      <Link href="/od-scanner" asChild>
        <Button title="Scan Student QR" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", gap: 12 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
});
