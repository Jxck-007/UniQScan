// app/screens/StaffDashboard.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './utils/api';

export default function StaffDashboard({ navigation }) {
  const [pending, setPending] = useState([]);

  useEffect(() => {
    fetchPending();
  }, []);

  async function fetchPending() {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const res = await api.get('/od/pending'); // implement in backend
      setPending(res.data.requests || []);
    } catch (err) {
      console.log(err?.response?.data || err.message);
    }
  }

  async function handleLogout() {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('role');
    await AsyncStorage.removeItem('userId');
    navigation.reset({ index: 0, routes: [{ name: 'StaffLogin' }] });
  }

  async function approveRequest(id) {
    try {
      const res = await api.post(`/od/approve/${id}`);
      fetchPending();
    } catch (err) {
      console.log(err?.response?.data || err.message);
    }
  }

  async function rejectRequest(id) {
    try {
      const res = await api.post(`/od/reject/${id}`);
      fetchPending();
    } catch (err) {
      console.log(err?.response?.data || err.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Staff Dashboard</Text>
      <Text style={{ marginBottom: 12 }}>Pending OD Requests</Text>

      <FlatList
        data={pending}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={{ fontWeight: '600' }}>{item.student_name || item.studentId}</Text>
            <Text>Date/Slot: {item.date} {item.slot}</Text>
            <Text>Reason: {item.reason}</Text>
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              <Button title="Approve" onPress={() => approveRequest(item.id)} />
              <View style={{ width: 12 }} />
              <Button title="Reject" onPress={() => rejectRequest(item.id)} />
            </View>
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
  card: { padding: 12, borderWidth: 1, borderColor: '#ddd', marginTop: 8, borderRadius: 6 },
});
