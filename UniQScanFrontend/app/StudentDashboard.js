// app/screens/StudentDashboard.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './utils/api';

export default function StudentDashboard({ navigation }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const res = await api.get('/dashboard/student'); // implement in backend
      setData(res.data);
    } catch (err) {
      console.log('fetchDash err', err?.response?.data || err.message);
    }
  }

  async function handleLogout() {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('role');
    await AsyncStorage.removeItem('userId');
    navigation.reset({ index: 0, routes: [{ name: 'StudentLogin' }] });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Dashboard</Text>
      <Text>Remaining Leaves: {data?.remaining_leaves ?? '—'}</Text>

      <Text style={{ marginTop: 12, fontWeight: '600' }}>Recent OD Requests</Text>
      <FlatList
        data={data?.od_requests || []}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.title || item.slot}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />

      <View style={{ marginTop: 18 }}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  card: { padding: 10, borderWidth: 1, borderColor: '#ddd', marginTop: 8, borderRadius: 6 },
});
