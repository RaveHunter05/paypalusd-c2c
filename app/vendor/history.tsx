import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  TextInput,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAccount } from 'wagmi';
import { apiService, Order } from '@/services/api';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function SalesHistory() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [transactions, setTransactions] = useState<Order[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    searchQuery: '',
  });

  const loadTransactions = async () => {
    if (!address) return;

    try {
      setLoading(true);
      const data = await apiService.getTransactionHistory(address);
      setTransactions(data);
      setFilteredTransactions(data);
    } catch (error) {
      // API service already handles fallback data
      console.warn('Using empty transaction history');
      setTransactions([]);
      setFilteredTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTransactions();
    setRefreshing(false);
  };

  useEffect(() => {
    if (isConnected && address) {
      loadTransactions();
    }
  }, [address, isConnected]);

  useEffect(() => {
    // Apply filters
    let filtered = [...transactions];

    if (filters.status !== 'all') {
      filtered = filtered.filter((tx) => tx.status === filters.status);
    }

    if (filters.searchQuery) {
      filtered = filtered.filter(
        (tx) =>
          tx.order_id.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          tx.buyer_name?.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    setFilteredTransactions(filtered);
  }, [filters, transactions]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900';
      case 'failed':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900';
    }
  };

  if (!isConnected) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900 p-6">
        <IconSymbol name="exclamationmark.triangle" size={64} color="#EF4444" />
        <Text className="text-2xl font-bold text-gray-900 dark:text-white mt-4 text-center">
          Wallet Not Connected
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="bg-blue-600 dark:bg-blue-700 px-6 pt-12 pb-6">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="mr-4 active:opacity-70"
          >
            <IconSymbol name="chevron.left" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-3xl font-bold text-white flex-1">
            Sales History
          </Text>
          <TouchableOpacity
            onPress={() => setShowFilters(!showFilters)}
            className="active:opacity-70"
          >
            <IconSymbol name="line.3.horizontal.decrease.circle" size={28} color="white" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="bg-white/20 rounded-xl px-4 py-3 flex-row items-center">
          <IconSymbol name="magnifyingglass" size={20} color="white" />
          <TextInput
            placeholder="Search by Order ID or Buyer..."
            placeholderTextColor="rgba(255,255,255,0.6)"
            value={filters.searchQuery}
            onChangeText={(text) => setFilters({ ...filters, searchQuery: text })}
            className="flex-1 ml-3 text-white text-base"
          />
        </View>
      </View>

      {/* Filters */}
      {showFilters && (
        <View className="bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <Text className="text-gray-900 dark:text-white font-semibold mb-3">
            Filter by Status
          </Text>
          <View className="flex-row gap-2">
            {['all', 'confirmed', 'pending', 'failed'].map((status) => (
              <TouchableOpacity
                key={status}
                onPress={() => setFilters({ ...filters, status })}
                className={`px-4 py-2 rounded-full ${
                  filters.status === status
                    ? 'bg-blue-600 dark:bg-blue-700'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <Text
                  className={`capitalize font-medium ${
                    filters.status === status
                      ? 'text-white'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {status}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Transactions List */}
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#2563EB" />
        </View>
      ) : (
        <ScrollView
          className="flex-1"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {filteredTransactions.length === 0 ? (
            <View className="items-center justify-center p-12">
              <IconSymbol name="tray" size={64} color="#9CA3AF" />
              <Text className="text-gray-500 dark:text-gray-400 text-lg mt-4 text-center">
                No transactions found
              </Text>
              <Text className="text-gray-400 dark:text-gray-500 text-sm mt-2 text-center">
                {filters.status !== 'all' || filters.searchQuery
                  ? 'Try adjusting your filters'
                  : 'Start making sales to see them here'}
              </Text>
            </View>
          ) : (
            <View className="px-6 py-4">
              {filteredTransactions.map((transaction) => (
                <View
                  key={transaction.order_id}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-3 shadow"
                >
                  {/* Header Row */}
                  <View className="flex-row items-center justify-between mb-3">
                    <View className="flex-1">
                      <Text className="text-gray-900 dark:text-white font-semibold text-lg">
                        ${transaction.amount}
                      </Text>
                      <Text className="text-gray-500 dark:text-gray-400 text-xs">
                        {formatDate(transaction.created_at)}
                      </Text>
                    </View>
                    <View
                      className={`px-3 py-1 rounded-full ${getStatusColor(
                        transaction.status
                      )}`}
                    >
                      <Text className="text-xs font-semibold capitalize">
                        {transaction.status}
                      </Text>
                    </View>
                  </View>

                  {/* Details */}
                  <View className="space-y-2">
                    {transaction.buyer_name && (
                      <View className="flex-row items-center">
                        <IconSymbol name="person.fill" size={14} color="#6B7280" />
                        <Text className="text-gray-600 dark:text-gray-400 text-sm ml-2">
                          {transaction.buyer_name}
                        </Text>
                      </View>
                    )}
                    <View className="flex-row items-center">
                      <IconSymbol name="number" size={14} color="#6B7280" />
                      <Text className="text-gray-600 dark:text-gray-400 text-xs font-mono ml-2">
                        {transaction.order_id.slice(0, 24)}...
                      </Text>
                    </View>
                    {transaction.tx_hash && (
                      <View className="flex-row items-center">
                        <IconSymbol name="link" size={14} color="#6B7280" />
                        <Text className="text-gray-600 dark:text-gray-400 text-xs font-mono ml-2">
                          {transaction.tx_hash.slice(0, 24)}...
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}
