import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Svg, {
    ClipPath,
    Defs,
    G,
    LinearGradient,
    Path,
    Rect,
    Stop,
} from 'react-native-svg';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    logo: {
        width: 66,
        height: 58,
    },
});

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

const GoogleIcon = () => (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
        <Path
            d="M16.8758 9.17493C16.8758 8.52743 16.8222 8.05493 16.7061 7.56494H9.1615V10.4874H13.59C13.5008 11.2137 13.0186 12.3074 11.9472 13.0424L11.9322 13.1402L14.3176 14.9513L14.4829 14.9674C16.0007 13.5937 16.8758 11.5724 16.8758 9.17493Z"
            fill="#4285F4"
        />
        <Path
            d="M9.16098 16.8751C11.3306 16.8751 13.152 16.175 14.4824 14.9675L11.9467 13.0425C11.2681 13.5062 10.3574 13.83 9.16098 13.83C7.03601 13.83 5.23246 12.4563 4.58954 10.5575L4.4953 10.5653L2.01486 12.4466L1.98242 12.535C3.30383 15.1075 6.01811 16.8751 9.16098 16.8751Z"
            fill="#34A853"
        />
        <Path
            d="M4.58998 10.5575C4.42034 10.0675 4.32216 9.54245 4.32216 8.99997C4.32216 8.45744 4.42034 7.93246 4.58106 7.44247L4.57656 7.33811L2.06503 5.42664L1.98285 5.46494C1.43824 6.53245 1.12573 7.73123 1.12573 8.99997C1.12573 10.2687 1.43824 11.4674 1.98285 12.5349L4.58998 10.5575Z"
            fill="#FBBC05"
        />
        <Path
            d="M9.16103 4.16998C10.6699 4.16998 11.6878 4.80873 12.2682 5.34251L14.536 3.1725C13.1432 1.90375 11.3306 1.125 9.16103 1.125C6.01814 1.125 3.30384 2.89249 1.98242 5.46497L4.58063 7.44249C5.23248 5.54375 7.03604 4.16998 9.16103 4.16998Z"
            fill="#EB4335"
        />
    </Svg>
);

const FacebookIcon = () => (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
        <G clipPath="url(#clip0_2002_665)">
            <Path
                d="M7.515 17.91C3.24 17.145 0 13.455 0 9C0 4.05 4.05 0 9 0C13.95 0 18 4.05 18 9C18 13.455 14.76 17.145 10.485 17.91L9.99 17.505H8.01L7.515 17.91Z"
                fill="url(#paint0_linear_2002_665)"
            />
            <Path
                d="M12.5101 11.52L12.9151 9.00001H10.5301V7.24501C10.5301 6.52501 10.8001 5.98501 11.8801 5.98501H13.0501V3.69001C12.4201 3.60001 11.7001 3.51001 11.0701 3.51001C9.00006 3.51001 7.56006 4.77001 7.56006 7.02001V9.00001H5.31006V11.52H7.56006V17.865C8.05506 17.955 8.55006 18 9.04506 18C9.54006 18 10.0351 17.955 10.5301 17.865V11.52H12.5101Z"
                fill="white"
            />
        </G>
        <Defs>
            <LinearGradient
                id="paint0_linear_2002_665"
                x1="9.00045"
                y1="17.374"
                x2="9.00045"
                y2="-0.0033155"
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#0062E0" />
                <Stop offset="1" stopColor="#19AFFF" />
            </LinearGradient>
            <ClipPath id="clip0_2002_665">
                <Rect width="18" height="18" fill="white" />
            </ClipPath>
        </Defs>
    </Svg>
);

const WalletConnect = () => (
    <Svg
        width={20}
        height={20}
        viewBox="0 0 24 24"
        style={{ marginRight: 8 }}
        accessibilityRole="image"
        aria-hidden
    >
        <Path
            d="M4.913 7.519c3.915-3.831 10.26-3.831 14.174 0l.471.461a.483.483 0 0 1 0 .694l-1.611 1.577a.252.252 0 0 1-.354 0l-.649-.634c-2.73-2.673-7.157-2.673-9.887 0l-.694.68a.255.255 0 0 1-.355 0L4.397 8.719a.482.482 0 0 1 0-.693l.516-.507Zm17.506 3.263 1.434 1.404a.483.483 0 0 1 0 .694l-6.466 6.331a.508.508 0 0 1-.709 0l-4.588-4.493a.126.126 0 0 0-.178 0l-4.589 4.493a.508.508 0 0 1-.709 0L.147 12.88a.483.483 0 0 1 0-.694l1.434-1.404a.508.508 0 0 1 .709 0l4.589 4.493c.05.048.129.048.178 0l4.589-4.493a.508.508 0 0 1 .709 0l4.589 4.493c.05.048.128.048.178 0l4.589-4.493a.507.507 0 0 1 .708 0Z"
            fill="#000000ff"
        />
    </Svg>
);

const EyeOffIcon = () => (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
        <Path
            d="M7.05671 7.05794C6.8067 7.30804 6.66628 7.64721 6.66634 8.00085C6.6664 8.35448 6.80694 8.6936 7.05704 8.94361C7.30714 9.19362 7.64631 9.33404 7.99994 9.33398C8.35358 9.33392 8.6927 9.19338 8.94271 8.94328M11.1207 11.1154C10.1855 11.7005 9.1031 12.0073 8 12C5.6 12 3.6 10.6667 2 8.00002C2.848 6.58669 3.808 5.54802 4.88 4.88402M6.78667 4.12002C7.18603 4.03917 7.59254 3.99897 8 4.00002C10.4 4.00002 12.4 5.33335 14 8.00002C13.556 8.74002 13.0807 9.37802 12.5747 9.91335M2 2L14 14"
            stroke="#ACB5BB"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('Loisbecket@gmail.com');
    const [password, setPassword] = useState('*******');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        router.replace('/(tabs)');
    };

    const handleGoogleLogin = () => {
        console.log('Google login');
    };

    const handleFacebookLogin = () => {
        console.log('Facebook login');
    };

    const handleForgotPassword = () => {
        console.log('Forgot password');
    };

    const handleSignUp = () => {
        console.log('Sign up');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-white"
        >
            <StatusBar style="dark" />
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View className="flex-1 px-6 pt-[68px] pb-4">
                    <View className="flex-1 justify-between">
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
                                    <Text
                                        className="text-[12px] leading-[16.8px]"
                                        style={{
                                            color: '#6C7278',
                                            letterSpacing: -0.12,
                                            fontFamily: Platform.select({
                                                ios: 'System',
                                                android: 'sans-serif',
                                                default: 'Inter',
                                            }),
                                        }}
                                    >
                                        Enter your email and password to log in
                                    </Text>
                                </View>
                            </View>

                            <View className="gap-6">
                                <View className="gap-4">
                                    <View className="gap-0.5">
                                        <View className="h-[21px] justify-center">
                                            <Text
                                                className="text-[12px] leading-[19.2px]"
                                                style={{
                                                    color: '#6C7278',
                                                    letterSpacing: -0.24,
                                                    fontFamily: Platform.select(
                                                        {
                                                            ios: 'System',
                                                            android:
                                                                'sans-serif',
                                                            default:
                                                                'Plus Jakarta Sans',
                                                        },
                                                    ),
                                                }}
                                            >
                                                Email
                                            </Text>
                                        </View>
                                        <View
                                            className="h-[46px] px-3.5 justify-center rounded-[10px] border"
                                            style={{
                                                borderColor: '#EDF1F3',
                                                backgroundColor: '#FFF',
                                                shadowColor: '#E4E5E7',
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 1,
                                                },
                                                shadowOpacity: 0.24,
                                                shadowRadius: 2,
                                                elevation: 2,
                                            }}
                                        >
                                            <TextInput
                                                value={email}
                                                onChangeText={setEmail}
                                                placeholder="yourname@gmail.com"
                                                placeholderTextColor="#ACB5BB"
                                                keyboardType="email-address"
                                                autoCapitalize="none"
                                                className="text-[14px] leading-[19.6px]"
                                                style={{
                                                    color: '#1A1C1E',
                                                    letterSpacing: -0.14,
                                                    fontFamily: Platform.select(
                                                        {
                                                            ios: 'System',
                                                            android:
                                                                'sans-serif',
                                                            default: 'Inter',
                                                        },
                                                    ),
                                                }}
                                            />
                                        </View>
                                    </View>

                                    <View className="gap-0.5">
                                        <View className="h-[21px] justify-center">
                                            <Text
                                                className="text-[12px] leading-[19.2px]"
                                                style={{
                                                    color: '#6C7278',
                                                    letterSpacing: -0.24,
                                                    fontFamily: Platform.select(
                                                        {
                                                            ios: 'System',
                                                            android:
                                                                'sans-serif',
                                                            default:
                                                                'Plus Jakarta Sans',
                                                        },
                                                    ),
                                                }}
                                            >
                                                Password
                                            </Text>
                                        </View>
                                        <View
                                            className="h-[46px] px-3.5 flex-row items-center justify-between rounded-[10px] border"
                                            style={{
                                                borderColor: '#EDF1F3',
                                                backgroundColor: '#FFF',
                                                shadowColor: '#E4E5E7',
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 1,
                                                },
                                                shadowOpacity: 0.24,
                                                shadowRadius: 2,
                                                elevation: 2,
                                            }}
                                        >
                                            <TextInput
                                                value={password}
                                                onChangeText={setPassword}
                                                placeholder="*******"
                                                placeholderTextColor="#ACB5BB"
                                                secureTextEntry={!showPassword}
                                                className="flex-1 text-[14px] leading-[19.6px]"
                                                style={{
                                                    color: '#1A1C1E',
                                                    letterSpacing: -0.14,
                                                    fontFamily: Platform.select(
                                                        {
                                                            ios: 'System',
                                                            android:
                                                                'sans-serif',
                                                            default: 'Inter',
                                                        },
                                                    ),
                                                }}
                                            />
                                            <TouchableOpacity
                                                onPress={() =>
                                                    setShowPassword(
                                                        !showPassword,
                                                    )
                                                }
                                                className="ml-3"
                                            >
                                                <EyeOffIcon />
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <TouchableOpacity
                                        onPress={handleForgotPassword}
                                    >
                                        <Text
                                            className="text-[12px] font-semibold leading-[16.8px] text-right"
                                            style={{
                                                color: '#4D81E7',
                                                letterSpacing: -0.12,
                                                fontFamily: Platform.select({
                                                    ios: 'System',
                                                    android: 'sans-serif',
                                                    default: 'Inter',
                                                }),
                                            }}
                                        >
                                            Forgot Password ?
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View className="gap-6">
                                    <TouchableOpacity
                                        onPress={handleLogin}
                                        className="h-12 px-6 justify-center items-center rounded-[10px] border"
                                        style={{
                                            borderColor: '#FFF',
                                            backgroundColor: '#1D61E7',
                                            shadowColor: '#253EA7',
                                            shadowOffset: {
                                                width: 0,
                                                height: 1,
                                            },
                                            shadowOpacity: 0.48,
                                            shadowRadius: 2,
                                            elevation: 3,
                                        }}
                                    >
                                        <Text
                                            className="text-[14px] leading-[19.6px] text-center"
                                            style={{
                                                color: '#FFF',
                                                letterSpacing: -0.14,
                                                fontFamily: Platform.select({
                                                    ios: 'System',
                                                    android: 'sans-serif',
                                                    default: 'Inter',
                                                }),
                                            }}
                                        >
                                            Log In
                                        </Text>
                                    </TouchableOpacity>

                                    <View className="gap-4">
                                        <View className="flex-row items-center gap-4">
                                            <View
                                                className="flex-1 h-[1px]"
                                                style={{
                                                    backgroundColor: '#EDF1F3',
                                                }}
                                            />
                                            <Text
                                                className="text-[12px] leading-[18px] text-center"
                                                style={{
                                                    color: '#6C7278',
                                                    letterSpacing: -0.12,
                                                    fontFamily: Platform.select(
                                                        {
                                                            ios: 'System',
                                                            android:
                                                                'sans-serif',
                                                            default: 'Inter',
                                                        },
                                                    ),
                                                }}
                                            >
                                                Or
                                            </Text>
                                            <View
                                                className="flex-1 h-[1px]"
                                                style={{
                                                    backgroundColor: '#EDF1F3',
                                                }}
                                            />
                                        </View>

                                        <View className="gap-[15px]">
                                            <TouchableOpacity
                                                onPress={handleGoogleLogin}
                                                className="h-12 px-6 flex-row justify-center items-center gap-2.5 rounded-[10px] border bg-white"
                                                style={{
                                                    borderColor: '#EFF0F6',
                                                    shadowColor: '#F4F5FA',
                                                    shadowOffset: {
                                                        width: 0,
                                                        height: -3,
                                                    },
                                                    shadowOpacity: 0.6,
                                                    shadowRadius: 6,
                                                    elevation: 2,
                                                }}
                                            >
                                                <GoogleIcon />
                                                <Text
                                                    className="text-[14px] font-semibold leading-[19.6px] text-center"
                                                    style={{
                                                        color: '#1A1C1E',
                                                        letterSpacing: -0.14,
                                                        fontFamily:
                                                            Platform.select({
                                                                ios: 'System',
                                                                android:
                                                                    'sans-serif',
                                                                default:
                                                                    'Inter',
                                                            }),
                                                    }}
                                                >
                                                    Continue with Google
                                                </Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                onPress={handleFacebookLogin}
                                                className="h-12 px-6 flex-row justify-center items-center gap-2.5 rounded-[10px] border bg-white"
                                                style={{
                                                    borderColor: '#EFF0F6',
                                                    shadowColor: '#F4F5FA',
                                                    shadowOffset: {
                                                        width: 0,
                                                        height: -3,
                                                    },
                                                    shadowOpacity: 0.6,
                                                    shadowRadius: 6,
                                                    elevation: 2,
                                                }}
                                            >
                                                <FacebookIcon />
                                                <Text
                                                    className="text-[14px] font-semibold leading-[19.6px] text-center"
                                                    style={{
                                                        color: '#1A1C1E',
                                                        letterSpacing: -0.14,
                                                        fontFamily:
                                                            Platform.select({
                                                                ios: 'System',
                                                                android:
                                                                    'sans-serif',
                                                                default:
                                                                    'Inter',
                                                            }),
                                                    }}
                                                >
                                                    Continue with Facebook
                                                </Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                onPress={handleGoogleLogin}
                                                className="h-12 px-6 flex-row justify-center items-center gap-2.5 rounded-[10px] border bg-white"
                                                style={{
                                                    borderColor: '#EFF0F6',
                                                    shadowColor: '#F4F5FA',
                                                    shadowOffset: {
                                                        width: 0,
                                                        height: -3,
                                                    },
                                                    shadowOpacity: 0.6,
                                                    shadowRadius: 6,
                                                    elevation: 2,
                                                }}
                                            >
                                                <WalletConnect />
                                                <Text
                                                    className="text-[14px] font-semibold leading-[19.6px] text-center"
                                                    style={{
                                                        color: '#1A1C1E',
                                                        letterSpacing: -0.14,
                                                        fontFamily:
                                                            Platform.select({
                                                                ios: 'System',
                                                                android:
                                                                    'sans-serif',
                                                                default:
                                                                    'Inter',
                                                            }),
                                                    }}
                                                >
                                                    Continue with WalletConnect
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={handleSignUp}
                            className="flex-row justify-center items-center gap-1.5"
                        >
                            <Text
                                className="text-[12px] leading-[16.8px]"
                                style={{
                                    color: '#6C7278',
                                    letterSpacing: -0.12,
                                    fontFamily: Platform.select({
                                        ios: 'System',
                                        android: 'sans-serif',
                                        default: 'Inter',
                                    }),
                                }}
                            >
                                Don't have an account?
                            </Text>
                            <Text
                                className="text-[12px] font-semibold leading-[16.8px]"
                                style={{
                                    color: '#4D81E7',
                                    letterSpacing: -0.12,
                                    fontFamily: Platform.select({
                                        ios: 'System',
                                        android: 'sans-serif',
                                        default: 'Inter',
                                    }),
                                }}
                            >
                                Sign Up
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
