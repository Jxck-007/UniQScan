// app/staff-od-approval.js
import { View, Text, Button, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function StaffODApproval() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>OD Requests</Text>

      <Link href="/od-details" asChild>
        <Button title="View Request Details" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", gap: 12 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
});
