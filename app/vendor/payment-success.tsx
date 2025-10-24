import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';
import * as Haptics from 'expo-haptics';

const BASESCAN_URL = 'https://sepolia.basescan.org/tx/';

export default function PaymentSuccess() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const orderId = params.orderId as string;
  const amount = params.amount as string;
  const txHash = params.txHash as string;

  useEffect(() => {
    // Success haptic feedback
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);

  const handleViewOnBasescan = () => {
    if (txHash) {
      Linking.openURL(`${BASESCAN_URL}${txHash}`);
    }
  };

  const handleNewPayment = () => {
    router.replace('/vendor/generate-order');
  };

  const handleBackToDashboard = () => {
    router.replace('/vendor/dashboard');
  };

  return (
    <View className="flex-1 bg-green-600 dark:bg-green-800">
      {/* Success Icon Section */}
      <View className="flex-1 items-center justify-center px-6">
        {/* Success Icon */}
        <View className="bg-white dark:bg-green-900 rounded-full p-8 mb-8 shadow-2xl">
          <IconSymbol name="checkmark.circle.fill" size={100} color="#16A34A" />
        </View>

        {/* Success Message */}
        <Text className="text-white text-4xl font-bold text-center mb-3">
          Payment Received!
        </Text>
        <Text className="text-green-100 text-lg text-center mb-8">
          Transaction confirmed on blockchain
        </Text>

        {/* Amount Display */}
        <View className="bg-white/10 rounded-2xl p-8 w-full mb-8">
          <Text className="text-green-100 text-sm text-center mb-2">
            Amount Received
          </Text>
          <Text className="text-white text-6xl font-bold text-center">
            ${amount}
          </Text>
          <Text className="text-green-100 text-xl text-center mt-2">
            PYUSD
          </Text>
        </View>

        {/* Transaction Details */}
        {txHash && (
          <View className="bg-white/10 rounded-xl p-4 w-full mb-6">
            <Text className="text-green-100 text-sm mb-2">Transaction Hash:</Text>
            <Text
              className="text-white font-mono text-xs mb-3"
              numberOfLines={1}
              ellipsizeMode="middle"
            >
              {txHash}
            </Text>
            <TouchableOpacity
              onPress={handleViewOnBasescan}
              className="bg-white/20 rounded-lg py-3 px-4 active:opacity-70"
            >
              <View className="flex-row items-center justify-center">
                <IconSymbol name="link" size={18} color="white" />
                <Text className="text-white font-semibold ml-2">
                  View on Basescan
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Order ID */}
        <View className="bg-white/10 rounded-xl p-4 w-full">
          <View className="flex-row items-center justify-between">
            <Text className="text-green-100 text-sm">Order ID:</Text>
            <Text className="text-white font-mono text-xs">
              {orderId?.slice(0, 16)}...
            </Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="px-6 pb-12 gap-3">
        <TouchableOpacity
          onPress={handleNewPayment}
          className="bg-white dark:bg-green-900 rounded-xl py-5 px-6 shadow-lg active:opacity-80"
        >
          <View className="flex-row items-center justify-center">
            <IconSymbol name="plus.circle.fill" size={24} color="#16A34A" />
            <Text className="text-green-600 dark:text-green-400 text-xl font-bold ml-2">
              New Payment
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleBackToDashboard}
          className="bg-white/20 rounded-xl py-5 px-6 active:opacity-70"
        >
          <Text className="text-white text-lg font-semibold text-center">
            Back to Dashboard
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
