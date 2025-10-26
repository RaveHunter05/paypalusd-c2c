import {
    KeyboardAvoidingView,
    Platform,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import ConnectButton from '../components/ConnectButton';
import { useRouter } from 'expo-router';
import { useAccount } from '@reown/appkit-react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';

const LogoIcon = () => (
    <Text
        className="text-[12px] leading-[16.8px]"
        style={{
            color: '#00c3ffff',
            letterSpacing: -0.12,
            fontFamily: Platform.select({
                ios: 'System',
                android: 'sans-serif',
                default: 'Inter',
            }),
        }}
    >
        Seamless Pay
    </Text>
);

export default function HomeScreen() {
    const router = useRouter();

    const { isConnected } = useAccount();
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-white"
        >
            <View className="flex-1 px-6">
                <View className="flex-1 justify-center items-center">
                    <View className="gap-8">
                        <View className="gap-8">
                            <LogoIcon />
                            <View className="gap-3">
                                <Text
                                    className="text-[32px] font-bold leading-[41.6px]"
                                    style={{
                                        color: '#1A1C1E',
                                        letterSpacing: -0.64,
                                        fontFamily: Platform.select({
                                            ios: 'System',
                                            android: 'sans-serif',
                                            default: 'Inter',
                                        }),
                                    }}
                                >
                                    Sign in to your Account
                                </Text>
                            </View>
                        </View>

                        <View className="gap-6">
                            <View className="gap-6">
                                <View className="gap-4">
                                    <View className="gap-[15px]">
                                        <ConnectButton className="mt-4" />
                                    </View>
                                </View>

                                {isConnected && (
                                    <View className="mt-8 w-full">
                                        <Text className="text-gray-600 dark:text-gray-400 text-sm text-center mb-4">
                                            Are you a vendor?
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() =>
                                                router.push('/vendor/dashboard')
                                            }
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
                        </View>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
