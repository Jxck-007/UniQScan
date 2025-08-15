// app/index.js
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>

      <Link href="/student" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>GO TO STUDENT DASHBOARD</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/staff" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>GO TO STAFF DASHBOARD</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "dodgerblue",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginVertical: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
