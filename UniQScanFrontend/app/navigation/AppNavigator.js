// app/navigation/AppNavigator.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import StudentLogin from '../StudentLogin';
import StaffLogin from '../StaffLogin';
import StudentRegister from '../StudentRegister';
import StaffRegister from '../StaffRegister';
import StudentDashboard from '../StudentDashboard';
import StaffDashboard from '../StaffDashboard';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const role = await AsyncStorage.getItem('role');
        if (role === 'student') setInitialRoute('StudentDashboard');
        else if (role === 'staff') setInitialRoute('StaffDashboard');
        else setInitialRoute('StudentLogin');  // default fallback
      } catch (e) {
        console.warn('Error reading role:', e);
        setInitialRoute('StudentLogin'); // fallback on error
      }
    })();
  }, []);

  if (!initialRoute) return null; // wait until initialRoute is set

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="StudentLogin"
          component={StudentLogin}
          options={{ title: 'Student Login' }}
        />
        <Stack.Screen
          name="StaffLogin"
          component={StaffLogin}
          options={{ title: 'Staff Login' }}
        />
        <Stack.Screen
          name="StudentRegister"
          component={StudentRegister}
          options={{ title: 'Student Register' }}
        />
        <Stack.Screen
          name="StaffRegister"
          component={StaffRegister}
          options={{ title: 'Staff Register' }}
        />
        <Stack.Screen
          name="StudentDashboard"
          component={StudentDashboard}
          options={{ title: 'Student Dashboard' }}
        />
        <Stack.Screen
          name="StaffDashboard"
          component={StaffDashboard}
          options={{ title: 'Staff Dashboard' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
