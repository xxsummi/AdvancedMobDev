import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function SpotifyRegistration() {
    const router = useRouter();
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
                                'rgba(211, 211, 211, 0.6)',
                                'rgba(0, 0, 0, 0.8)',
                                'rgba(0, 0, 0, 0)',
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
                            placeholderTextColor="#b3b3b3"
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
                            placeholderTextColor="#b3b3b3"
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
                            placeholderTextColor="#b3b3b3"
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
                          placeholderTextColor="#b3b3b3"
                          value={dateOfBirth.day}
                          onChangeText={(text) => setDateOfBirth({ ...dateOfBirth, day: text })}
                          keyboardType="numeric"
                          maxLength={2}
                        />
                        <TextInput
                          style={[styles.textInput, styles.dobInput]}
                          placeholder="MM"
                          placeholderTextColor="#b3b3b3"
                          value={dateOfBirth.month}
                          onChangeText={(text) => setDateOfBirth({ ...dateOfBirth, month: text })}
                          keyboardType="numeric"
                          maxLength={2}
                        />
                        <TextInput
                          style={[styles.textInput, styles.dobInput]}
                          placeholder="YYYY"
                          placeholderTextColor="#b3b3b3"
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
                            <Text style={styles.signInLink}
                            onPress={() => router.back()}>Sign In</Text>
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
        backgroundColor: "#121212",
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
        shadowColor: '#000',
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
        shadowColor: "#666666",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
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
      color: "#1DB954",
      fontSize: 14,
      fontWeight: "500",
      marginBottom: 0,  // remove margin bottom since it’s inline
      width: 100,       // fix label width to align inputs nicely
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
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 100,
        padding: 14,
        alignItems: "center",
        shadowColor: "#666666",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    genderButtonActive: {
        backgroundColor: "#1DB954",
        borderColor: "#1DB954",
    },
    genderButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "500",
    },
    genderButtonTextActive: {
        color: "#000000",
        fontWeight: "700",
    },
    signUpButton: {
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
    signUpButtonDisabled: {
        backgroundColor: "rgba(29, 185, 84, 0.6)",
    },
    signUpButtonText: {
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
        shadowColor: "#666666",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    socialIcon: {
        fontSize: 24,
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    signInContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    signInText: {
        color: "rgba(255, 255, 255, 0.7)",
        fontSize: 14,
    },
    signInLink: {
        color: "#1DB954",
        fontSize: 14,
        fontWeight: "600",
    },
});