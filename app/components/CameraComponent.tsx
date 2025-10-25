import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Text, View, Linking } from 'react-native';

import { Button } from '@/components/ui/button';

interface BarCodeInterface {
    data: string;
}

interface CameraInterface {
    closeCammeraFunction: () => void;
}

function CameraComponent({ closeCammeraFunction }: CameraInterface) {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    const handleBarcodeScanned = ({ data }: BarCodeInterface) => {
        setScanned(true);
        console.log(`QR Code Scanned: ${data}`);
        // Example: Open the scanned URL
        Linking.openURL(data).catch((err) =>
            console.error("Couldn't open URL", err),
        );
    };

    if (!permission || !permission.granted) {
        // Handle permission request as shown above
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text style={{ textAlign: 'center' }}>
                    We need your permission to show the camera
                </Text>
                <Button className="bg-orange-400" onPress={requestPermission}>
                    <Text className="text-white">grant permission</Text>
                </Button>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <CameraView
                style={{ flex: 1 }}
                onBarcodeScanned={scanned ? undefined : handleBarcodeScanned} // Prevent multiple scans
                barcodeScannerSettings={{
                    barcodeTypes: ['qr'],
                }}
            />
            {scanned && (
                <Button
                    className="bg-blue-400"
                    onPress={() => setScanned(false)}
                >
                    <Text className="text-white">Tap to Scan Again</Text>
                </Button>
            )}
            <Button
                className="bg-red-400 mt-3"
                onPress={() => closeCammeraFunction()}
            >
                <Text className="text-white">Click to close cammera</Text>
            </Button>
        </View>
    );
}

export default CameraComponent;
