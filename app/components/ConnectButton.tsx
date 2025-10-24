// components/ConnectButton.tsx
import { Button } from '@/components/ui/button';
import { useAppKit, useAccount } from '@reown/appkit-react-native';
import { useRouter } from 'expo-router';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';

interface Interface {
    className?: string;
}

function ConnectButton({ className }: Interface) {
    const { open, disconnect } = useAppKit();
    const { isConnected } = useAccount();

    const router = useRouter();

    const handleDisconnect = () => {
        disconnect();
        router.push('/(tabs)');
    };

    if (isConnected) {
        return (
            <View className={`${className}`}>
                <TouchableOpacity
                    className="bg-red-500 p-4 rounded-xl p-4 shadow-lg active:opacity-80 mt-3"
                    onPress={handleDisconnect}
                >
                    <View className="flex-row items-center justify-center">
                        <Text className="text-white text-lg font-bold ml-3">
                            Disconnect
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    if (!isConnected) {
        return (
            <View className={`${className}`}>
                <TouchableOpacity
                    className="bg-blue-300 dark:bg-blue-400 rounded-xl p-4 shadow-lg active:opacity-80"
                    onPress={() => open()}
                >
                    <View className="flex-row items-center justify-center">
                        <Text className="text-white text-lg font-bold ml-3">
                            Connect Wallet
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default ConnectButton;
