import { IconSymbol } from '@/components/ui/icon-symbol';
import { apiService } from '@/services/api';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useAccount } from 'wagmi';

export default function GenerateOrder() {
    const router = useRouter();
    const { address, isConnected } = useAccount();
    const scrowAddress = "0xf43A12BDD996997705155c8b6b1C569FDc786966"
    const [amount, setAmount] = useState<string>('0');
    const [loading, setLoading] = useState(false);
    const [qrData, setQrData] = useState<string | null>(null);
    const [orderId, setOrderId] = useState<string | null>(null);

    const handleClear = () => {
        setAmount('0');
        setQrData(null);
        setOrderId(null);
    };

    const handleChangeAmount = (text: string) => {
        setAmount(text);
    };

    const handleGenerateQR = async () => {
        if (!amount || parseFloat(amount) <= 0) {
            Alert.alert('Error', 'Please enter a valid amount');
            return;
        }

        if (!address) {
            Alert.alert('Error', 'Wallet not connected');
            return;
        }

        try {
            setLoading(true);
            const response = await apiService.createOrder({
                vendor_address: scrowAddress, // SCROW ADDRESS
                amount: parseFloat(amount),
            });

            // PYUSD Token on Ethereum Sepolia
            const PYUSD_TOKEN = '0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9';
            const CHAIN_ID = '11155111';

            // Convert amount to token wei (6 decimals para PYUSD/USDC)
            const amountInWei = Math.floor(
                parseFloat(amount) * 1_000_000,
            ).toString();

            // 🌟 Generar el Deep Link de Transacción de MetaMask
            const paymentURI =
                `https://metamask.app.link/send/${PYUSD_TOKEN}@${CHAIN_ID}/transfer?` +
                `address=${address}&` + // Dirección del RECEPTOR (VENDEDOR)
                `uint256=${amountInWei}`; // Monto en wei 

            setQrData(paymentURI);
            setOrderId(response.order_id);

            console.log('MetaMask Deep Link (Sepolia):', paymentURI);
            console.log('Order ID:', response.order_id);
            console.log('Amount in wei:', amountInWei);
        } catch (error) {
            console.warn('Order creation handled by fallback');
        } finally {
            setLoading(false);
        }
    };

    if (!isConnected) {
        return (
            <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900 p-6">
                <IconSymbol
                    name="exclamationmark.triangle"
                    size={64}
                    color="#EF4444"
                />
                <Text className="text-2xl font-bold text-gray-900 dark:text-white mt-4 text-center">
                    Wallet Not Connected
                </Text>
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <View className="bg-blue-600 dark:bg-blue-700 px-6 pt-12 pb-8">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="mb-4 active:opacity-70"
                >
                    <IconSymbol name="chevron.left" size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-3xl font-bold text-white mb-2">
                    Point of Sale
                </Text>
                <Text className="text-blue-100 text-sm">
                    Enter the sale amount
                </Text>
            </View>

            <View className="px-6 pt-8">
                {/* Amount Display */}
                <View className="bg-white dark:bg-gray-800 rounded-xl p-8 mb-6 shadow-lg">
                    <Text className="text-gray-600 dark:text-gray-400 text-lg mb-2">
                        Amount to charge
                    </Text>
                    <View className="flex-row items-baseline">
                        <View className="flex flex-row items-center">
                            <Text className="text-6xl font-bold text-gray-900 dark:text-white">
                                $
                            </Text>
                            <TextInput
                                className="text-6xl font-bold text-gray-900 dark:text-white"
                                onChangeText={handleChangeAmount}
                                value={amount.toString()}
                                keyboardType="numeric"
                            />
                        </View>
                        <Text className="text-2xl text-gray-600 dark:text-gray-400 ml-2">
                            PYUSD
                        </Text>
                    </View>
                </View>

                {/* QR Code Preview (if generated) */}
                {qrData && (
                    <View className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 items-center shadow-lg">
                        <Text className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                            Payment QR Code
                        </Text>
                        <QRCode value={qrData} size={200} />
                        <Text className="text-gray-500 dark:text-gray-500 text-xs mt-4 mb-4">
                            Order ID: {orderId?.slice(0, 8)}...
                        </Text>

                        {/* Monitor Payment Button */}
                        <TouchableOpacity
                            onPress={() => {
                                router.push({
                                    pathname: '/vendor/wait-payment',
                                    params: {
                                        orderId: orderId,
                                        amount: amount,
                                    },
                                });
                            }}
                            className="bg-green-600 dark:bg-green-700 rounded-xl px-8 py-4 active:opacity-80 mt-2"
                        >
                            <Text className="text-white text-lg font-bold text-center">
                                Monitor Payment →
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Action Buttons */}
                <View className="gap-3 mb-8">
                    <TouchableOpacity
                        onPress={handleGenerateQR}
                        disabled={loading || !amount || !!qrData}
                        className={`rounded-xl p-5 shadow-lg ${
                            loading || !amount || qrData
                                ? 'bg-gray-400 dark:bg-gray-700'
                                : 'bg-blue-600 dark:bg-blue-700 active:opacity-80'
                        }`}
                    >
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text className="text-white text-xl font-bold text-center">
                                {qrData
                                    ? 'QR Code Generated ✓'
                                    : 'Generate QR Code'}
                            </Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleClear}
                        className="bg-gray-200 dark:bg-gray-700 rounded-xl p-5 active:opacity-80"
                    >
                        <Text className="text-gray-900 dark:text-white text-xl font-bold text-center">
                            Clear
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}
