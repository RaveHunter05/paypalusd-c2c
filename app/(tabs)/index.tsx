import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import ConnectButton from '../components/ConnectButton';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAccount } from '@reown/appkit-react-native';

export default function HomeScreen() {
    const router = useRouter();

    const { address, isConnected, chainId } = useAccount();

    return (
        <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900 text-center px-6">
            <Text className="text-2xl font-bold text-blue-400">
                Welcome to EasyCripto! 🖐️
            </Text>
            <Text className="text-sm font-bold text-center mt-4 text-gray-800 dark:text-gray-200">
                C2C and B2C Payments
            </Text>
            <Text className="text-sm font-bold text-center text-gray-800 dark:text-gray-200">
                with PYUSD made Easy
            </Text>

            <ConnectButton className="mt-4" />

            {/* Vendor Dashboard Access */}
            {isConnected && (
                <View className="mt-8 w-full">
                    <Text className="text-gray-600 dark:text-gray-400 text-sm text-center mb-4">
                        Are you a vendor?
                    </Text>
                    <TouchableOpacity
                        onPress={() => router.push('/vendor/dashboard')}
                        className="bg-blue-600 dark:bg-blue-700 rounded-xl p-4 shadow-lg active:opacity-80"
                    >
                        <View className="flex-row items-center justify-center">
                            <IconSymbol
                                name="cart.fill"
                                size={24}
                                color="white"
                            />
                            <Text className="text-white text-lg font-bold ml-3">
                                Vendor Dashboard
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}
