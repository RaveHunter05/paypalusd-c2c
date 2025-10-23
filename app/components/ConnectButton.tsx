// components/ConnectButton.tsx
import { Button } from '@/components/ui/button';
import { useAppKit, useAccount } from '@reown/appkit-react-native';
import { Text, View } from 'react-native';

interface Interface {
    className: string;
}

function ConnectButton({ className }: Interface) {
    const { open, disconnect } = useAppKit();
    const { address, isConnected, chainId } = useAccount();

    if (isConnected) {
        return (
            <View className={`${className}`}>
                <Text>Connected to: {chainId}</Text>
                <Text>Address: {address}</Text>
                <Button className="bg-red-500" onPress={() => disconnect()}>
                    <Text className="text-white"> Disconnect </Text>
                </Button>
            </View>
        );
    }

    return (
        <Button className={`bg-blue-300 + ${className}`} onPress={() => open()}>
            <Text className="text-white">Connect Wallet</Text>
        </Button>
    );
}

export default ConnectButton;
