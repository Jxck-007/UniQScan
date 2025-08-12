// app/screens/StudentRegister.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import api from './utils/api';

export default function StudentRegister({ navigation }) {
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState(''); // email or student id
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!name.trim() || !identifier.trim() || !password) {
      Alert.alert('Validation', 'Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      // include role to let backend know which type
      const res = await api.post('/auth/register', { username: identifier, email: identifier, password, role: 'student', name });
      Alert.alert('Registered', 'You can now login');
      navigation.replace('StudentLogin');
    } catch (err) {
      console.log(err?.response?.data || err.message);
      Alert.alert('Registration failed', err?.response?.data?.error || 'Server error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Student Register</Text>
      <TextInput style={styles.input} placeholder="Full name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email or Student ID" value={identifier} onChangeText={setIdentifier} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title={loading ? 'Creating...' : 'Create Account'} onPress={handleRegister} disabled={loading} />
      <TouchableOpacity onPress={() => navigation.navigate('StudentLogin')} style={{ marginTop: 12 }}>
        <Text style={styles.link}>Back to Login</Text>
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
