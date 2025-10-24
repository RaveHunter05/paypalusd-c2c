import { Stack } from 'expo-router';
import React from 'react';

export default function VendorLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="generate-order" />
      <Stack.Screen name="wait-payment" />
      <Stack.Screen name="payment-success" />
      <Stack.Screen name="history" />
    </Stack>
  );
}
