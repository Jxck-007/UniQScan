// app/screens/StaffLogin.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './utils/api';

export default function StaffLogin({ navigation }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!identifier.trim() || !password) {
      Alert.alert('Validation', 'Please fill both fields');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { identifier, password });
      const token = res.data.token || res.data.access_token || res.data.accessToken;
      const role = res.data.user?.role || res.data.role;
      if (!token) throw new Error('No token returned');

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('role', role);
      await AsyncStorage.setItem('userId', String(res.data.user?.id || res.data.userId || ''));

      if (role === 'staff') {
        navigation.reset({ index: 0, routes: [{ name: 'StaffDashboard' }] });
      } else {
        Alert.alert('Access denied', 'This account is not staff.');
      }
    } catch (err) {
      console.log(err?.response?.data || err.message);
      Alert.alert('Login failed', (err?.response?.data?.error || err?.response?.data?.msg) || 'Check credentials or server');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Staff Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email or Username"
        value={identifier}
        onChangeText={setIdentifier}
        autoCapitalize="none"
      />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title={loading ? 'Signing in...' : 'Sign In'} onPress={handleLogin} disabled={loading} />
      <TouchableOpacity onPress={() => navigation.navigate('StaffRegister')} style={{ marginTop: 12 }}>
        <Text style={styles.link}>Create Staff Account</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('StudentLogin')} style={{ marginTop: 8 }}>
        <Text style={styles.link}>Student? Login here</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 18, justifyContent: 'center' },
  heading: { fontSize: 22, marginBottom: 12, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 12, borderRadius: 6 },
  link: { color: '#2a7bf6', textAlign: 'center' },
});
