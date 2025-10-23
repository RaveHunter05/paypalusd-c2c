// src/AppKitConfig.ts (or wherever you configure AppKit)
import '@walletconnect/react-native-compat'; // add this import before using appkit

import AsyncStorage from '@react-native-async-storage/async-storage';

import { type Storage } from '@reown/appkit-react-native';
import { safeJsonParse, safeJsonStringify } from '@walletconnect/safe-json';

import { createAppKit } from '@reown/appkit-react-native';
import { WagmiAdapter } from '@reown/appkit-wagmi-react-native';
import { http, createConfig as createWagmiCoreConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains'; // Or other chains you need
// ... other adapter imports if any

const projectId = process.env.EXPO_PUBLIC_PROJECT_ID || ''; // Obtain from https://dashboard.reown.com/

export const wagmiAdapter = new WagmiAdapter({
    projectId,
    networks: [mainnet, sepolia], // Add all chains you want to support
});

const storage: Storage = {
    getKeys: async () => {
        return (await AsyncStorage.getAllKeys()) as string[];
    },
    getEntries: async <T = any>(): Promise<[string, T][]> => {
        const keys = await AsyncStorage.getAllKeys();
        return await Promise.all(
            keys.map(async (key) => [
                key,
                safeJsonParse((await AsyncStorage.getItem(key)) ?? '') as T,
            ]),
        );
    },
    setItem: async <T = any>(key: string, value: T) => {
        await AsyncStorage.setItem(key, safeJsonStringify(value));
    },
    getItem: async <T = any>(key: string): Promise<T | undefined> => {
        const item = await AsyncStorage.getItem(key);
        if (typeof item === 'undefined' || item === null) {
            return undefined;
        }

        return safeJsonParse(item) as T;
    },
    removeItem: async (key: string) => {
        await AsyncStorage.removeItem(key);
    },
};

const metadata = {
    name: 'c2c app',
    description: 'my c2c app',
    url: 'https://myapp.com',
    icons: ['https://myapp.com/icon.png'],
    redirect: {
        native: 'YOUR_APP_SCHEME://',
        universal: 'YOUR_APP_UNIVERSAL_LINK.com',
    },
};

export const appKit = createAppKit({
    projectId,
    networks: [mainnet, sepolia],
    adapters: [wagmiAdapter],
    metadata: metadata,
    defaultNetwork: sepolia,
    storage: storage,
});
