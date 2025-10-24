import { Tabs } from 'expo-router';
import React from 'react';
import { AppKit } from '@reown/appkit-react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { View } from 'react-native';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                    headerShown: false,
                    tabBarButton: HapticTab,
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        href: null,
                        tabBarIcon: ({ color }) => (
                            <IconSymbol
                                size={28}
                                name="house.fill"
                                color={color}
                            />
                        ),
                    }}
                />
            </Tabs>
            <View
                style={{ position: 'absolute', height: '100%', width: '100%' }}
            >
                <AppKit />
            </View>
        </>
    );
}
