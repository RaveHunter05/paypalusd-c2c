import { ScrollView, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
    return (
        <ScrollView contentContainerStyle={styles.mainContainer}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Welcome!</ThemedText>
                <HelloWave />
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">
                    Easy Payments With Criptos Using PYUSD
                </ThemedText>
                <ThemedText>
                    Send and receive payments with Crypto Using PYUSD
                </ThemedText>
            </ThemedView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
	backgroundColor: "#fff",
	height: '100%',
	padding: 40
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
	color: "blue",
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
