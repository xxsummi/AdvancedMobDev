import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SettingsScreen({ navigation }) {
    const router = useRouter();
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(true);
    const [autoPlay, setAutoPlay] = useState(false);
    const [highQuality, setHighQuality] = useState(true);
    const [socialShare, setSocialShare] = useState(false);

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Logout",
                    onPress: () => {
                        // Navigate to SpotifyLogin
                        router.replace('/Spotify')
                    },
                    style: "destructive"
                }
            ]
        );
    };

    const handleNavigateBack = () => {
        router.back();
    };

    const SettingItem = ({ title, subtitle, value, onValueChange, icon }) => (
        <View style={styles.settingItem}>
            <View style={styles.settingIcon}>
                <Ionicons name={icon} size={22} color="#1DB954" />
            </View>
            <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>{title}</Text>
                {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
            </View>
            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{ false: "rgba(255, 255, 255, 0.2)", true: "#1DB954" }}
                thumbColor={value ? "#FFFFFF" : "#f4f3f4"}
                ios_backgroundColor="rgba(255, 255, 255, 0.2)"
            />
        </View>
    );

    const ActionItem = ({ title, subtitle, onPress, icon, textColor = "#FFFFFF" }) => (
        <TouchableOpacity style={styles.actionItem} onPress={onPress}>
            <View style={styles.settingIcon}>
                <Ionicons name={icon} size={22} color="#1DB954" />
            </View>
            <View style={styles.settingContent}>
                <Text style={[styles.settingTitle, { color: textColor }]}>{title}</Text>
                {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
            </View>
            <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
        </TouchableOpacity>
    );

    return (
        <LinearGradient
            colors={['#242424', '#000000']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleNavigateBack}
                >
                    <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
                <View style={styles.menuButton} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Preferences Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Preferences</Text>
                    <View style={styles.sectionContent}>
                        <SettingItem
                            title="Notifications"
                            subtitle="Push notifications and alerts"
                            value={notifications}
                            onValueChange={setNotifications}
                            icon="notifications"
                        />
                        <SettingItem
                            title="Dark Mode"
                            subtitle="Use dark theme"
                            value={darkMode}
                            onValueChange={setDarkMode}
                            icon="moon"
                        />
                        <SettingItem
                            title="Auto Play"
                            subtitle="Automatically play similar songs"
                            value={autoPlay}
                            onValueChange={setAutoPlay}
                            icon="play-circle"
                        />
                    </View>
                </View>

                {/* Audio Quality Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Audio</Text>
                    <View style={styles.sectionContent}>
                        <SettingItem
                            title="High Quality Audio"
                            subtitle="Stream music in high quality"
                            value={highQuality}
                            onValueChange={setHighQuality}
                            icon="musical-notes"
                        />
                    </View>
                </View>

                {/* Social Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Social</Text>
                    <View style={styles.sectionContent}>
                        <SettingItem
                            title="Share Activity"
                            subtitle="Let others see what you're listening to"
                            value={socialShare}
                            onValueChange={setSocialShare}
                            icon="share"
                        />
                    </View>
                </View>

                {/* Account Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account</Text>
                    <View style={styles.sectionContent}>
                        <ActionItem
                            title="Privacy Settings"
                            subtitle="Manage your privacy preferences"
                            onPress={() => console.log("Privacy Settings")}
                            icon="shield-checkmark"
                        />
                        <ActionItem
                            title="Data Usage"
                            subtitle="Monitor your data consumption"
                            onPress={() => console.log("Data Usage")}
                            icon="bar-chart"
                        />
                        <ActionItem
                            title="Storage"
                            subtitle="Manage offline downloads"
                            onPress={() => console.log("Storage")}
                            icon="archive"
                        />
                    </View>
                </View>

                {/* Support Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Support</Text>
                    <View style={styles.sectionContent}>
                        <ActionItem
                            title="Help Center"
                            subtitle="Get help and support"
                            onPress={() => console.log("Help Center")}
                            icon="help-circle"
                        />
                        <ActionItem
                            title="About"
                            subtitle="App version and information"
                            onPress={() => console.log("About")}
                            icon="information-circle"
                        />
                    </View>
                </View>

                {/* Logout Button */}
                <View style={styles.section}>
                    <View style={styles.sectionContent}>
                        <ActionItem
                            title="Logout"
                            subtitle="Sign out of your account"
                            onPress={handleLogout}
                            icon="log-out"
                            textColor="#FF4757"
                        />
                    </View>
                </View>

                {/* App Version */}
                <View style={styles.versionContainer}>
                    <Text style={styles.versionText}>Spotify Clone v1.0.0</Text>
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
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#FFFFFF",
        letterSpacing: -0.5,
    },
    menuButton: {
        width: 40,
        height: 40,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
        paddingTop: 0,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#FFFFFF",
        marginBottom: 16,
        letterSpacing: -0.5,
    },
    sectionContent: {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: 16,
        overflow: "hidden",
    },
    settingItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255, 255, 255, 0.1)",
    },
    actionItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255, 255, 255, 0.1)",
    },
    settingIcon: {
        width: 40,
        height: 40,
        backgroundColor: "rgba(29, 185, 84, 0.1)",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
    },
    settingContent: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#FFFFFF",
        marginBottom: 2,
    },
    settingSubtitle: {
        fontSize: 14,
        color: "rgba(255, 255, 255, 0.6)",
    },
    versionContainer: {
        alignItems: "center",
        marginTop: 20,
        marginBottom: 30,
    },
    versionText: {
        fontSize: 14,
        color: "rgba(255, 255, 255, 0.5)",
    },
});