import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { PortalHost } from '@rn-primitives/portal';

import '../global.css';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AppKitProvider } from '@reown/appkit-react-native';
import { appKit, wagmiAdapter } from '@/config/AppKitConfig';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const unstable_settings = {
    initialRouteName: 'index',
};

const queryClient = new QueryClient();

export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
        <SafeAreaProvider>
            <AppKitProvider instance={appKit}>
                <WagmiProvider config={wagmiAdapter.wagmiConfig}>
                    <QueryClientProvider client={queryClient}>
                        <ThemeProvider
                            value={
                                colorScheme === 'dark'
                                    ? DarkTheme
                                    : DefaultTheme
                            }
                        >
                            <Stack>
                                <Stack.Screen
                                    name="index"
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="login"
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="(tabs)"
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="vendor"
                                    options={{ headerShown: false }}
                                />
                                <Stack.Screen
                                    name="modal"
                                    options={{
                                        presentation: 'modal',
                                        title: 'Modal',
                                    }}
                                />
                            </Stack>
                            <PortalHost />
                            <StatusBar style="auto" />
                        </ThemeProvider>
                    </QueryClientProvider>
                </WagmiProvider>
            </AppKitProvider>
        </SafeAreaProvider>
    );
}
