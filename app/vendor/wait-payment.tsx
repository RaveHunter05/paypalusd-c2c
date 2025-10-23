import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { apiService, Order } from '@/services/api';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAccount } from 'wagmi';
import * as Haptics from 'expo-haptics';

export default function WaitPayment() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { address } = useAccount();
  const [order, setOrder] = useState<Order | null>(null);
  const [backendAvailable, setBackendAvailable] = useState(true);

  const orderId = params.orderId as string;
  const amount = params.amount as string;

  useEffect(() => {
    if (!orderId) {
      router.back();
      return;
    }

    let errorCount = 0;

    // Subscribe to order updates
    const unsubscribe = apiService.subscribeToOrder(orderId, (updatedOrder) => {
      setOrder(updatedOrder);
      setBackendAvailable(true);
      errorCount = 0; // Reset error count on success

      if (updatedOrder.status === 'confirmed') {
        // Haptic feedback on success
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        
        // Navigate to confirmation screen
        router.replace({
          pathname: '/vendor/payment-success',
          params: {
            orderId: updatedOrder.order_id,
            amount: updatedOrder.amount,
            txHash: updatedOrder.tx_hash || '',
          },
        });
      } else if (updatedOrder.status === 'failed') {
        // Haptic feedback on error
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        
        // Navigate back to dashboard
        router.replace('/vendor/dashboard');
      }
    });

    // Check if backend is available after a few failed attempts
    const checkBackendTimer = setInterval(() => {
      errorCount++;
      if (errorCount >= 3) {
        setBackendAvailable(false);
      }
    }, 6000); // Check every 6 seconds

    return () => {
      unsubscribe();
      clearInterval(checkBackendTimer);
    };
  }, [orderId]);

  const handleSimulateSuccess = () => {
    // For testing without backend
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.replace({
      pathname: '/vendor/payment-success',
      params: {
        orderId: orderId,
        amount: amount,
        txHash: '0xmock123456789abcdef',
      },
    });
  };

  return (
    <View className="flex-1 bg-blue-600 dark:bg-blue-800 items-center justify-center px-6">
      {/* Icon */}
      <View className="bg-white dark:bg-blue-900 rounded-full p-8 mb-8 shadow-2xl">
        <IconSymbol name="qrcode" size={80} color="#2563EB" />
      </View>

      {/* Loading Indicator */}
      <ActivityIndicator size="large" color="white" />

      {/* Status Text */}
      <Text className="text-white text-3xl font-bold mt-8 text-center">
        Waiting for Payment
      </Text>
      <Text className="text-blue-100 text-lg mt-3 text-center">
        Customer is scanning the QR code...
      </Text>

      {/* Amount Display */}
      <View className="bg-white/10 rounded-2xl p-6 mt-8 w-full">
        <Text className="text-blue-100 text-sm text-center mb-2">
          Amount to receive
        </Text>
        <Text className="text-white text-5xl font-bold text-center">
          ${amount}
        </Text>
        <Text className="text-blue-100 text-lg text-center mt-1">
          PYUSD
        </Text>
      </View>

      {/* Order Info */}
      <View className="mt-8 bg-white/10 rounded-xl p-4 w-full">
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-blue-100 text-sm">Order ID:</Text>
          <Text className="text-white font-mono text-xs">
            {orderId?.slice(0, 16)}...
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-blue-100 text-sm">Your Address:</Text>
          <Text className="text-white font-mono text-xs">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </Text>
        </View>
      </View>

      {/* Backend Warning + Test Button */}
      {!backendAvailable && (
        <View className="absolute bottom-12 px-6 w-full">
          <View className="bg-yellow-500/20 rounded-xl p-4 mb-3">
            <View className="flex-row items-center mb-2">
              <IconSymbol name="exclamationmark.triangle.fill" size={20} color="#EAB308" />
              <Text className="text-yellow-300 font-semibold ml-2">
                Backend Not Available
              </Text>
            </View>
            <Text className="text-yellow-100 text-xs mb-3">
              The backend API is not running. In production, this would monitor the blockchain for payments.
            </Text>
            <TouchableOpacity
              onPress={handleSimulateSuccess}
              className="bg-yellow-500 rounded-lg py-3 px-4 active:opacity-80"
            >
              <Text className="text-white font-bold text-center">
                Simulate Payment Success (Test Mode)
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Status Indicator */}
      {backendAvailable && (
        <View className="absolute bottom-12 flex-row items-center">
          <View className="w-3 h-3 bg-green-400 rounded-full mr-2" />
          <Text className="text-blue-100 text-sm">
            Monitoring blockchain for transaction...
          </Text>
        </View>
      )}
    </View>
  );
}
