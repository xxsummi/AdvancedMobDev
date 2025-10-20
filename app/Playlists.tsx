import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    FlatList,
    Image,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import { AnimatedContainer } from '../components/AnimatedContainer';
import { useTheme } from '../hooks/useTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = SCREEN_WIDTH * 0.75;

const DrawerOverlay = ({ isVisible, onClose, children, theme }) => {
    const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isVisible) {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 250,
                    useNativeDriver: true,
                })
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: -DRAWER_WIDTH,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                })
            ]).start();
        }
    }, [isVisible]);

    if (!isVisible) return null;

    const drawerStyles = StyleSheet.create({
        drawerContainer: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
        },
        backdrop: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        drawerContent: {
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: DRAWER_WIDTH,
            backgroundColor: theme.colors.surface,
        },
    });

    return (
        <View style={drawerStyles.drawerContainer}>
            <TouchableWithoutFeedback onPress={onClose}>
                <Animated.View style={[drawerStyles.backdrop, { opacity: opacityAnim }]} />
            </TouchableWithoutFeedback>
            <Animated.View
                style={[
                    drawerStyles.drawerContent,
                    { transform: [{ translateX: slideAnim }] }
                ]}
            >
                {children}
            </Animated.View>
        </View>
    );
};

export default function PlaylistsScreen() {
    const router = useRouter();
    const { theme, currentThemeId } = useTheme();
    const [selectedTab, setSelectedTab] = useState('Playlists');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const isIOS = Platform.OS === 'ios';

    // Platform-specific playlist data
    const playlists = [
        {
            id: '1',
            title: 'Liked Songs',
            subtitle: 'Playlist • 374 songs',
            coverColor: [theme.colors.accent, theme.colors.primary],
            icon: 'heart',
            iconColor: '#FFFFFF'
        },
        {
            id: '2',
            title: '<3',
            subtitle: 'Playlist • Summi',
            coverImage: require('../assets/images/playlist1.jpeg'),
            hasImage: true
        },
        {
            id: '3',
            title: 'On Repeat',
            subtitle: 'Playlist • Made for Summi',
            coverColor: ['#EC4899', '#BE185D'],
            icon: 'repeat',
            iconColor: '#FFFFFF'
        },
        {
            id: '4',
            title: 'Local Files',
            subtitle: 'Playlist • 0 tracks',
            coverColor: ['#059669', '#10B981'],
            icon: 'folder',
            iconColor: '#FFFFFF'
        },
        {
            id: '5',
            title: 'Hot Hits Philippines',
            subtitle: 'Playlist • Spotify',
            coverImage: require('../assets/images/playlist2.jpeg'),
            hasImage: true
        },
        {
            id: '6',
            title: 'taylor swift songs but she\'s in love',
            subtitle: 'Playlist • hannah🌿🤍🖤',
            coverImage: require('../assets/images/playlist3.png'),
            hasImage: true
        },
        {
            id: '7',
            title: 'Love Me Not Radio',
            subtitle: 'Playlist • Made for Summi',
            coverImage: require('../assets/images/playlist4.jpg'),
            hasImage: true
        }
    ];

    const tabs = ['Playlists', 'Podcasts', 'Albums', 'Artists', 'Downloaded'];

    const handlePlaylistPress = (playlist) => {
        console.log(`Opening playlist: ${playlist.title}`);
        router.push({
            pathname: '/PlaylistScreen',
            params: {
                id: playlist.id,
                title: playlist.title,
                subtitle: playlist.subtitle,
                hasImage: playlist.hasImage || false,
                coverImage: playlist.hasImage ? playlist.coverImage : null,
                coverColor: playlist.coverColor ? JSON.stringify(playlist.coverColor) : null,
                icon: playlist.icon || null,
                iconColor: playlist.iconColor || null
            }
        });
    };

    const handleDrawerItemPress = (item) => {
        setIsDrawerOpen(false);

        switch(item) {
            case 'profile':
                router.push('/Profile');
                break;
            case 'playlists':
                break;
            case 'settings':
                router.push('/Settings');
                break;
            default:
                break;
        }
    };

    const PlaylistCover = ({ playlist }) => {
        if (playlist.hasImage) {
            return (
                <Image
                    source={playlist.coverImage}
                    style={styles.playlistCover}
                />
            );
        }

        return (
            <View style={styles.playlistCover}>
                <LinearGradient
                    colors={playlist.coverColor}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFill}
                />
                <Ionicons name={playlist.icon} size={24} color={playlist.iconColor} />
            </View>
        );
    };

    const PlaylistItem = ({ item }) => (
        <TouchableOpacity
            style={styles.playlistItem}
            onPress={() => handlePlaylistPress(item)}
        >
            <PlaylistCover playlist={item} />
            <View style={styles.playlistInfo}>
                <Text style={styles.playlistTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.playlistSubtitle} numberOfLines={1}>{item.subtitle}</Text>
            </View>
        </TouchableOpacity>
    );

    const DrawerContent = () => (
        <View style={styles.drawer}>
            <StatusBar
                barStyle={theme.colors.background === '#FFFFFF' ? 'dark-content' : 'light-content'}
                backgroundColor="rgba(0,0,0,0.5)"
                translucent
            />

            {/* Profile Section */}
            <TouchableOpacity
                style={styles.profileSection}
                onPress={() => handleDrawerItemPress('profile')}
            >
                <Image
                    source={require('../assets/images/soojin.jpeg')}
                    style={styles.drawerProfileImage}
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>Summi</Text>
                    <Text style={styles.viewProfile}>View profile</Text>
                </View>
            </TouchableOpacity>

            {/* Navigation Items */}
            <View style={styles.navigationSection}>
                <TouchableOpacity
                    style={styles.navigationItem}
                    onPress={() => handleDrawerItemPress('whats-new')}
                >
                    <Ionicons name="flash" size={24} color={theme.colors.text} />
                    <Text style={styles.navigationText}>What's new</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navigationItem}
                    onPress={() => handleDrawerItemPress('recents')}
                >
                    <Ionicons name="time" size={24} color={theme.colors.text} />
                    <Text style={styles.navigationText}>Recents</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navigationItem}
                    onPress={() => handleDrawerItemPress('settings')}
                >
                    <Ionicons name="settings" size={24} color={theme.colors.text} />
                    <Text style={styles.navigationText}>Settings and privacy</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.playlistsPreview} />
        </View>
    );

    const getStatusBarStyle = () => {
        return theme.colors.background === '#FFFFFF' ? 'dark-content' : 'light-content';
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        platformIndicator: {
            backgroundColor: theme.colors.accent,
            paddingVertical: 4,
            paddingHorizontal: 16,
            alignItems: 'center',
        },
        platformText: {
            color: theme.colors.background === '#FFFFFF' ? theme.colors.background : '#000000',
            fontSize: 12,
            fontWeight: '600',
        },
        iosControls: {
            flexDirection: 'row',
            gap: 8,
        },
        drawer: {
            flex: 1,
            paddingTop: 50,
        },
        profileSection: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border + '40',
            marginBottom: 10,
        },
        drawerProfileImage: {
            width: 48,
            height: 48,
            borderRadius: 24,
            marginRight: 16,
        },
        profileInfo: {
            flex: 1,
        },
        profileName: {
            fontSize: 18,
            fontWeight: '700',
            color: theme.colors.text,
            marginBottom: 4,
        },
        viewProfile: {
            fontSize: 14,
            color: theme.colors.textSecondary,
        },
        navigationSection: {
            paddingTop: 10,
        },
        navigationItem: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 16,
        },
        navigationText: {
            fontSize: 16,
            color: theme.colors.text,
            marginLeft: 20,
            fontWeight: '500',
        },
        playlistsPreview: {
            flex: 1,
            opacity: 0.1,
        },
        header: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 50,
            paddingHorizontal: 16,
            paddingBottom: 16,
            marginBottom: 16,
            backgroundColor: theme.colors.surface,
        },
        headerLeft: {
            flexDirection: "row",
            alignItems: "center",
        },
        profilePic: {
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: theme.colors.accent,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
            overflow: "hidden",
        },
        profileImage: {
            width: "100%",
            height: "100%",
            resizeMode: "cover",
        },
        headerTitle: {
            fontSize: 22,
            fontWeight: "700",
            color: theme.colors.text,
        },
        headerRight: {
            flexDirection: "row",
            gap: 8,
        },
        headerButton: {
            width: 32,
            height: 32,
            alignItems: "center",
            justifyContent: "center",
        },
        tabsContainer: {
            paddingHorizontal: 16,
            marginBottom: 16,
            backgroundColor: theme.colors.background,
        },
        tabsContent: {
            gap: 12,
        },
        tab: {
            backgroundColor: theme.colors.border + '40',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
        },
        activeTab: {
            backgroundColor: theme.colors.accent,
        },
        tabText: {
            color: theme.colors.textSecondary,
            fontSize: 14,
            fontWeight: "500",
        },
        activeTabText: {
            color: theme.colors.background === '#FFFFFF' ? '#000000' : '#FFFFFF',
            fontWeight: "600",
        },
        sortContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            marginBottom: 8,
            backgroundColor: theme.colors.background,
        },
        sortButton: {
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
        },
        sortText: {
            color: theme.colors.text,
            fontSize: 14,
            fontWeight: "500",
        },
        gridButton: {
            padding: 4,
        },
        playlistsList: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        playlistsContent: {
            paddingHorizontal: 16,
            paddingBottom: 100,
        },
        playlistItem: {
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 8,
            marginBottom: 4,
        },
        playlistCover: {
            width: 56,
            height: 56,
            borderRadius: 4,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
            overflow: "hidden",
        },
        playlistInfo: {
            flex: 1,
        },
        playlistTitle: {
            fontSize: 16,
            fontWeight: "500",
            color: theme.colors.text,
            marginBottom: 2,
            lineHeight: 20,
        },
        playlistSubtitle: {
            fontSize: 14,
            color: theme.colors.textSecondary,
            lineHeight: 18,
        },
        bottomNav: {
            flexDirection: "row",
            backgroundColor: theme.colors.surface,
            paddingBottom: 20,
            paddingTop: 8,
            paddingHorizontal: 16,
            borderTopWidth: 1,
            borderTopColor: theme.colors.border + '20',
        },
        navItem: {
            flex: 1,
            alignItems: "center",
            gap: 4,
        },
        activeNavItem: {
        },
        navText: {
            color: theme.colors.textSecondary,
            fontSize: 11,
            fontWeight: "500",
        },
        activeNavText: {
            color: theme.colors.text,
        },
    });

    return (
        <AnimatedContainer style={styles.container}>
            <StatusBar
                barStyle={getStatusBarStyle()}
                backgroundColor={theme.colors.surface}
            />

            
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity
                        style={styles.profilePic}
                        onPress={() => setIsDrawerOpen(true)}
                    >
                        <Image
                            source={require('../assets/images/soojin.jpeg')}
                            style={styles.profileImage}
                        />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Your Library</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.headerButton}>
                        <Ionicons name="search" size={24} color={theme.colors.text} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerButton}>
                        <Ionicons name="add" size={24} color={theme.colors.text} />
                    </TouchableOpacity>
                    {isIOS && (
                        <TouchableOpacity style={styles.headerButton}>
                            <Ionicons name="ellipsis-horizontal" size={24} color={theme.colors.text} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Tabs */}
            <View style={styles.tabsContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.tabsContent}
                >
                    {tabs.map(tab => (
                        <TouchableOpacity
                            key={tab}
                            style={[
                                styles.tab,
                                selectedTab === tab && styles.activeTab
                            ]}
                            onPress={() => setSelectedTab(tab)}
                        >
                            <Text style={[
                                styles.tabText,
                                selectedTab === tab && styles.activeTabText
                            ]}>{tab}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>


            {/* Sort Section */}
            <View style={styles.sortContainer}>
                <TouchableOpacity style={styles.sortButton}>
                    <Ionicons name="swap-vertical" size={16} color={theme.colors.text} />
                    <Text style={styles.sortText}>Recents</Text>
                </TouchableOpacity>
                {isIOS ? (
                    <View style={styles.iosControls}>
                        <TouchableOpacity style={styles.gridButton}>
                            <Ionicons name="list" size={20} color={theme.colors.text} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.gridButton}>
                            <Ionicons name="grid" size={20} color={theme.colors.text} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity style={styles.gridButton}>
                        <Ionicons name="grid" size={20} color={theme.colors.text} />
                    </TouchableOpacity>
                )}
            </View>

            {/* Playlists List */}
            <FlatList
                data={playlists}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <PlaylistItem item={item} />}
                style={styles.playlistsList}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.playlistsContent}
            />

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="home" size={24} color={theme.colors.textSecondary} />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="search" size={24} color={theme.colors.textSecondary} />
                    <Text style={styles.navText}>Search</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
                    <Ionicons name="library" size={24} color={theme.colors.text} />
                    <Text style={[styles.navText, styles.activeNavText]}>Your Library</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="add-circle" size={24} color={theme.colors.textSecondary} />
                    <Text style={styles.navText}>Create</Text>
                </TouchableOpacity>
            </View>

            {/* Drawer Overlay */}
            <DrawerOverlay isVisible={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} theme={theme}>
                <DrawerContent />
            </DrawerOverlay>
        </AnimatedContainer>
    );
}