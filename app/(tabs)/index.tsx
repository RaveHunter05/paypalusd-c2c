import { StyleSheet, View, Text } from 'react-native';

export default function HomeScreen() {
    return (
        <View className="flex-1 items-center justify-center bg-white text-center">
            <Text className="text-2xl font-bold text-blue-400">
                Welcome to EasyCripto! 🖐️
            </Text>
            <Text className="text-sm font-bold text-center mt-4">
                C2C and B2C Payments
            </Text>
            <Text className="text-sm font-bold text-center">
                with PYUSD made Easy
            </Text>
        </View>
    );
}
