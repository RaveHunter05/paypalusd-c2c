import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAccount } from 'wagmi';
import { apiService, DashboardStats } from '@/services/api';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function VendorDashboard() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadStats = async () => {
    if (!address) return;
    
    try {
      setLoading(true);
      const data = await apiService.getDashboardStats(address);
      setStats(data);
    } catch (error) {
      // API service already handles fallback data
      console.warn('Using fallback stats data');
      setStats({
        daily_income: '0.00',
        monthly_income: '0.00',
        total_transactions: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadStats();
    setRefreshing(false);
  };

  useEffect(() => {
    if (isConnected && address) {
      loadStats();
    }
  }, [address, isConnected]);

  if (!isConnected) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900 p-6">
        <IconSymbol name="exclamationmark.triangle" size={64} color="#EF4444" />
        <Text className="text-2xl font-bold text-gray-900 dark:text-white mt-4 text-center">
          Wallet Not Connected
        </Text>
        <Text className="text-base text-gray-600 dark:text-gray-400 mt-2 text-center">
          Please connect your wallet to access the vendor dashboard
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-gray-50 dark:bg-gray-900"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <View className="bg-blue-600 dark:bg-blue-700 px-6 pt-12 pb-8">
        <Text className="text-3xl font-bold text-white mb-2">
          Sales Dashboard
        </Text>
        <Text className="text-blue-100 text-sm">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </Text>
      </View>

      {/* Stats Cards */}
      {loading ? (
        <View className="p-6">
          <ActivityIndicator size="large" color="#2563EB" />
        </View>
      ) : (
        <View className="px-6 -mt-6">
          {/* Daily Income Card */}
          <View className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-4 shadow-lg">
            <View className="flex-row items-center mb-2">
              <IconSymbol name="calendar" size={24} color="#10B981" />
              <Text className="text-gray-600 dark:text-gray-400 ml-2 text-sm">
                Today's Income
              </Text>
            </View>
            <Text className="text-4xl font-bold text-gray-900 dark:text-white">
              ${stats?.daily_income || '0.00'}
            </Text>
            <Text className="text-green-600 dark:text-green-400 text-sm mt-1">
              PYUSD
            </Text>
          </View>

          {/* Monthly Income Card */}
          <View className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-4 shadow-lg">
            <View className="flex-row items-center mb-2">
              <IconSymbol name="chart.bar" size={24} color="#8B5CF6" />
              <Text className="text-gray-600 dark:text-gray-400 ml-2 text-sm">
                This Month
              </Text>
            </View>
            <Text className="text-4xl font-bold text-gray-900 dark:text-white">
              ${stats?.monthly_income || '0.00'}
            </Text>
            <Text className="text-purple-600 dark:text-purple-400 text-sm mt-1">
              {stats?.total_transactions || 0} transactions
            </Text>
          </View>
        </View>
      )}

      {/* Action Buttons */}
      <View className="px-6 mt-4 mb-8">
        {/* New Payment Button - Primary CTA */}
        <TouchableOpacity
          onPress={() => router.push('/vendor/generate-order')}
          className="bg-blue-600 dark:bg-blue-700 rounded-xl p-6 mb-4 shadow-lg active:opacity-80"
        >
          <View className="flex-row items-center justify-center">
            <IconSymbol name="plus.circle.fill" size={32} color="white" />
            <Text className="text-white text-2xl font-bold ml-3">
              New Payment
            </Text>
          </View>
        </TouchableOpacity>

        {/* Secondary Actions */}
        <View className="flex-row gap-4">
          <TouchableOpacity
            onPress={() => router.push('/vendor/history')}
            className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-4 shadow active:opacity-80"
          >
            <IconSymbol name="clock.fill" size={24} color="#6B7280" />
            <Text className="text-gray-900 dark:text-white font-semibold mt-2">
              History
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // TODO: Implement withdraw funds
              alert('Withdraw funds feature coming soon!');
            }}
            className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-4 shadow active:opacity-80"
          >
            <IconSymbol name="banknote" size={24} color="#6B7280" />
            <Text className="text-gray-900 dark:text-white font-semibold mt-2">
              Withdraw
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
