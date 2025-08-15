import { View, Text, Button } from "react-native";
import { Link } from "expo-router";

export default function ODQR() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20 }}>Your OD QR Code</Text>
      {/* QR Code component here */}

      <Link href="/student" style={{ marginTop: 10 }}>
        <Button title="Back to Dashboard" />
      </Link>
    </View>
  );
}
