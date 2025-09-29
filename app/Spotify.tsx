import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTheme } from '../hooks/useTheme';
import { AnimatedContainer } from '../components/AnimatedContainer';

export default function Spotify() {
    const router = useRouter();
    const { theme, currentThemeId } = useTheme();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        setIsLoading(true);

        // Simulate login process
        setTimeout(() => {
            setIsLoading(false);
            Alert.alert("Success", "Login successful!");
        }, 2000);
    };

    const handleSocialLogin = (platform: string) => {
        Alert.alert("Social Login", `${platform} login coming soon!`);
    };

    const getGradientColors = () => {
        if (currentThemeId === 'light') {
            return ['#F8F9FA', '#FFFFFF'];
        } else if (currentThemeId === 'custom') {
            return [theme.colors.surface, theme.colors.background];
        }
        return ['#242424', '#000000']; // Default dark theme
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        scrollContent: {
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            paddingTop: 60,
        },
        logoContainer: {
            alignItems: "center",
            marginBottom: 60,
        },
        logoCircle: {
            width: 140,
            height: 140,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
            overflow: 'hidden',
            shadowColor: theme.colors.text,
            shadowOffset: { width: 6, height: 6 },
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 8,
            backgroundColor: 'transparent',
        },
        logoImage: {
            width: 140,
            height: 140,
        },
        spotifyText: {
            fontSize: 32,
            fontWeight: "700",
            color: theme.colors.text,
            letterSpacing: -0.5,
        },
        formContainer: {
            width: "100%",
            maxWidth: 320,
        },
        inputContainer: {
            marginBottom: 16,
        },
        textInput: {
            backgroundColor: theme.colors.surface,
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: 100,
            padding: 14,
            fontSize: 16,
            color: theme.colors.text,
            shadowColor: theme.colors.text,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.1,
            shadowRadius: 16,
            elevation: 10,
        },
        forgotContainer: {
            alignItems: "flex-end",
            marginBottom: 32,
        },
        forgotText: {
            color: theme.colors.textSecondary,
            fontSize: 14,
        },
        signInButton: {
            backgroundColor: theme.colors.accent,
            paddingVertical: 16,
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
            shadowColor: theme.colors.accent,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 16,
            elevation: 10,
        },
        signInButtonDisabled: {
            backgroundColor: theme.colors.accent + '60',
        },
        signInButtonText: {
            color: currentThemeId === 'light' ? theme.colors.background : "#000000",
            fontSize: 16,
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: 1,
        },
        connectSection: {
            alignItems: "center",
            marginBottom: 40,
        },
        connectText: {
            color: theme.colors.textSecondary,
            fontSize: 14,
            marginBottom: 20,
            fontWeight: "500",
        },
        socialButtons: {
            flexDirection: "row",
            gap: 20,
        },
        socialButton: {
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: theme.colors.surface,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: theme.colors.border,
            shadowColor: theme.colors.text,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.1,
            shadowRadius: 16,
            elevation: 10,
        },
        socialIcon: {
            fontSize: 24,
            color: theme.colors.text,
            fontWeight: "bold",
        },
        signUpContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
        },
        signUpText: {
            color: theme.colors.textSecondary,
            fontSize: 14,
        },
        signUpLink: {
            color: theme.colors.accent,
            fontSize: 14,
            fontWeight: "600",
        },
    });

    return (
        <AnimatedContainer style={styles.container}>
            <LinearGradient
                colors={getGradientColors()}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.container}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {/* Spotify Logo */}
                    <View style={styles.logoContainer}>
                        <View style={styles.logoCircle}>
                            <LinearGradient
                                colors={[
                                    currentThemeId === 'light'
                                        ? 'rgba(29, 185, 84, 0.3)'
                                        : 'rgba(211, 211, 211, 0.6)',
                                    theme.colors.background + 'CC',
                                    theme.colors.background + '00',
                                ]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={StyleSheet.absoluteFill}
                            />

                            <Image
                                source={require('../assets/images/Spotify.png')}
                                style={styles.logoImage}
                            />
                        </View>
                        <Text style={styles.spotifyText}>Spotify</Text>
                    </View>

                    {/* Login Form */}
                    <View style={styles.formContainer}>
                        {/* Username Input */}
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Username"
                                placeholderTextColor={theme.colors.textSecondary}
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                                autoComplete="username"
                            />
                        </View>

                        {/* Password Input */}
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Password"
                                placeholderTextColor={theme.colors.textSecondary}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                autoComplete="password"
                            />
                        </View>

                        {/* Forgot Password */}
                        <View style={styles.forgotContainer}>
                            <TouchableOpacity>
                                <Text style={styles.forgotText}>Forgot password?</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Sign In Button */}
                        <TouchableOpacity
                            style={[styles.signInButton, isLoading && styles.signInButtonDisabled]}
                            onPress={() => router.push('/SpotifyRegistration')}
                            disabled={isLoading}
                        >
                            <Text style={styles.signInButtonText}>
                                {isLoading ? "Signing in..." : "Sign in"}
                            </Text>
                        </TouchableOpacity>

                        {/* Or Connect With */}
                        <View style={styles.connectSection}>
                            <Text style={styles.connectText}>Be Correct With</Text>
                            <View style={styles.socialButtons}>
                                <TouchableOpacity
                                    style={styles.socialButton}
                                    onPress={() => handleSocialLogin("Facebook")}
                                >
                                    <Text style={styles.socialIcon}>f</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.socialButton}
                                    onPress={() => handleSocialLogin("Google")}
                                >
                                    <Text style={styles.socialIcon}>G</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Sign Up Link */}
                        <View style={styles.signUpContainer}>
                            <Text style={styles.signUpText}>Don't have an account? </Text>
                            <TouchableOpacity>
                                <Text
                                    style={styles.signUpLink}
                                    onPress={() => router.push('/SpotifyRegistration')}
                                >
                                    Sign Up
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </AnimatedContainer>
    );
}