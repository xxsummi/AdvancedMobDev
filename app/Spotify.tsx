import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
// import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';


export default function Spotify() {
    const router = useRouter();
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

    return (
            <LinearGradient
              colors={['#242424', '#000000']}
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
                            'rgba(211, 211, 211, 0.6)', // light gray with opacity
                            'rgba(0, 0, 0, 0.8)',        // dark with less opacity for smooth blend
                            'rgba(0, 0, 0, 0)',          // transparent at the very end for fade out
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
                            placeholderTextColor="#b3b3b3"
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
                            placeholderTextColor="#b3b3b3"
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
                            <Text style={styles.signUpLink}
                            onPress={() => router.push('/SpotifyRegistration')}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212", // Spotify dark background
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
      shadowColor: '#000',
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
        color: "#FFFFFF",
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
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 100,
        padding: 14,
        fontSize: 16,
        color: "#FFFFFF",
        borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 24,
                shadowColor: "#666666",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
                elevation: 10,
    },
    forgotContainer: {
        alignItems: "flex-end",
        marginBottom: 32,
    },
    forgotText: {
        color: "rgba(255, 255, 255, 0.7)",
        fontSize: 14,
    },
    signInButton: {
        backgroundColor: "#1DB954",
        paddingVertical: 16,
        borderRadius: 100,
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 24,
                        shadowColor: "#666666",
                        shadowOffset: { width: 0, height: 8 },
                        shadowOpacity: 0.3,
                        shadowRadius: 16,
                        elevation: 10,
    },
    signInButtonDisabled: {
        backgroundColor: "rgba(29, 185, 84, 0.6)",
    },
    signInButtonText: {
        color: "#000000",
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
        color: "rgba(255, 255, 255, 0.7)",
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
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 100,
        marginBottom: 24,
        shadowColor: "#666666",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 10,
    },
    socialIcon: {
        fontSize: 24,
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    signUpContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    signUpText: {
        color: "rgba(255, 255, 255, 0.7)",
        fontSize: 14,
    },
    signUpLink: {
        color: "#1DB954",
        fontSize: 14,
        fontWeight: "600",
    },
});
