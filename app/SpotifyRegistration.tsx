import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTheme } from '../hooks/useTheme';
import { AnimatedContainer } from '../components/AnimatedContainer';

export default function SpotifyRegistration() {
    const router = useRouter();
    const { theme, currentThemeId } = useTheme();
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState({ day: "", month: "", year: "" });
    const [gender, setGender] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async () => {
        if (!email || !fullName || !password || !dateOfBirth.day || !dateOfBirth.month || !dateOfBirth.year || !gender) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        setIsLoading(true);

        // Simulate registration process
        setTimeout(() => {
            setIsLoading(false);
            Alert.alert("Success", "Registration successful!");
        }, 2000);
    };

    const handleSocialSignUp = (platform) => {
        Alert.alert("Social Sign Up", `${platform} sign up coming soon!`);
    };

    const handleGenderSelect = (selectedGender) => {
        setGender(selectedGender);
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
            marginBottom: 40,
        },
        logoCircle: {
            width: 120,
            height: 120,
            borderRadius: 60,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
            overflow: 'hidden',
            shadowColor: theme.colors.text,
            shadowOffset: { width: 6, height: 6 },
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 8,
            backgroundColor: 'transparent',
        },
        logoImage: {
            width: 120,
            height: 120,
        },
        spotifyText: {
            fontSize: 28,
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
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5,
        },
        dobContainer: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
            gap: 10,
        },
        dobLabel: {
            color: theme.colors.accent,
            fontSize: 14,
            fontWeight: "500",
            marginBottom: 0,
            width: 100,
        },
        dobInputs: {
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
            gap: 10,
        },
        dobInput: {
            flex: 1,
            textAlign: "center",
            paddingVertical: 10,
            fontSize: 16,
        },
        genderContainer: {
            marginBottom: 32,
        },
        genderButtons: {
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 15,
        },
        genderButton: {
            flex: 1,
            backgroundColor: theme.colors.surface,
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: 100,
            padding: 14,
            alignItems: "center",
            shadowColor: theme.colors.text,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5,
        },
        genderButtonActive: {
            backgroundColor: theme.colors.accent,
            borderColor: theme.colors.accent,
        },
        genderButtonText: {
            color: theme.colors.text,
            fontSize: 16,
            fontWeight: "500",
        },
        genderButtonTextActive: {
            color: currentThemeId === 'light' ? theme.colors.background : "#000000",
            fontWeight: "700",
        },
        signUpButton: {
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
        signUpButtonDisabled: {
            backgroundColor: theme.colors.accent + '60',
        },
        signUpButtonText: {
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
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5,
        },
        socialIcon: {
            fontSize: 24,
            color: theme.colors.text,
            fontWeight: "bold",
        },
        signInContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
        },
        signInText: {
            color: theme.colors.textSecondary,
            fontSize: 14,
        },
        signInLink: {
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

                    {/* Registration Form */}
                    <View style={styles.formContainer}>
                        {/* Email Input */}
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Email Address"
                                placeholderTextColor={theme.colors.textSecondary}
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                autoComplete="email"
                            />
                        </View>

                        {/* Full Name Input */}
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Full Name"
                                placeholderTextColor={theme.colors.textSecondary}
                                value={fullName}
                                onChangeText={setFullName}
                                autoComplete="name"
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

                        {/* Date of Birth */}
                        <View style={styles.dobContainer}>
                            <Text style={styles.dobLabel}>Date Of Birth :</Text>
                            <View style={styles.dobInputs}>
                                <TextInput
                                    style={[styles.textInput, styles.dobInput]}
                                    placeholder="DD"
                                    placeholderTextColor={theme.colors.textSecondary}
                                    value={dateOfBirth.day}
                                    onChangeText={(text) => setDateOfBirth({ ...dateOfBirth, day: text })}
                                    keyboardType="numeric"
                                    maxLength={2}
                                />
                                <TextInput
                                    style={[styles.textInput, styles.dobInput]}
                                    placeholder="MM"
                                    placeholderTextColor={theme.colors.textSecondary}
                                    value={dateOfBirth.month}
                                    onChangeText={(text) => setDateOfBirth({ ...dateOfBirth, month: text })}
                                    keyboardType="numeric"
                                    maxLength={2}
                                />
                                <TextInput
                                    style={[styles.textInput, styles.dobInput]}
                                    placeholder="YYYY"
                                    placeholderTextColor={theme.colors.textSecondary}
                                    value={dateOfBirth.year}
                                    onChangeText={(text) => setDateOfBirth({ ...dateOfBirth, year: text })}
                                    keyboardType="numeric"
                                    maxLength={4}
                                />
                            </View>
                        </View>

                        {/* Gender Selection */}
                        <View style={styles.genderContainer}>
                            <View style={styles.genderButtons}>
                                <TouchableOpacity
                                    style={[
                                        styles.genderButton,
                                        gender === "Male" && styles.genderButtonActive
                                    ]}
                                    onPress={() => handleGenderSelect("Male")}
                                >
                                    <Text style={[
                                        styles.genderButtonText,
                                        gender === "Male" && styles.genderButtonTextActive
                                    ]}>Male</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.genderButton,
                                        gender === "Female" && styles.genderButtonActive
                                    ]}
                                    onPress={() => handleGenderSelect("Female")}
                                >
                                    <Text style={[
                                        styles.genderButtonText,
                                        gender === "Female" && styles.genderButtonTextActive
                                    ]}>Female</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Sign Up Button */}
                        <TouchableOpacity
                            style={[styles.signUpButton, isLoading && styles.signUpButtonDisabled]}
                            onPress={() => router.push('/Playlists')}
                            disabled={isLoading}
                        >
                            <Text style={styles.signUpButtonText}>
                                {isLoading ? "Signing up..." : "Sign Up"}
                            </Text>
                        </TouchableOpacity>

                        {/* Or Sign Up With */}
                        <View style={styles.connectSection}>
                            <Text style={styles.connectText}>Sign Up With</Text>
                            <View style={styles.socialButtons}>
                                <TouchableOpacity
                                    style={styles.socialButton}
                                    onPress={() => handleSocialSignUp("Facebook")}
                                >
                                    <Text style={styles.socialIcon}>f</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.socialButton}
                                    onPress={() => handleSocialSignUp("Google")}
                                >
                                    <Text style={styles.socialIcon}>G</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Sign In Link */}
                        <View style={styles.signInContainer}>
                            <Text style={styles.signInText}>Already have an account? </Text>
                            <TouchableOpacity>
                                <Text
                                    style={styles.signInLink}
                                    onPress={() => router.back()}
                                >
                                    Sign In
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </AnimatedContainer>
    );
}