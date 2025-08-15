// app/_layout.js
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{ title: "Login" }} />
      <Stack.Screen name="student-dashboard" options={{ title: "Student Dashboard" }} />
      <Stack.Screen name="staff-dashboard" options={{ title: "Staff Dashboard" }} />
      <Stack.Screen name="od-scanner" options={{ title: "OD Scanner" }} />
      <Stack.Screen name="od-details" options={{ title: "OD Details" }} />
    </Stack>
  );
}
