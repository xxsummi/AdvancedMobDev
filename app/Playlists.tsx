// import React, { useState, useRef, useEffect } from "react";
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     StyleSheet,
//     ScrollView,
//     FlatList,
//     Image,
//     Animated,
//     Dimensions,
//     TouchableWithoutFeedback,
//     StatusBar
// } from "react-native";
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
//
// const { width: SCREEN_WIDTH } = Dimensions.get('window');
// const DRAWER_WIDTH = SCREEN_WIDTH * 0.75;
//
// const DrawerOverlay = ({ isVisible, onClose, children }) => {
//     const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
//     const opacityAnim = useRef(new Animated.Value(0)).current;
//
//     useEffect(() => {
//         if (isVisible) {
//             Animated.parallel([
//                 Animated.timing(slideAnim, {
//                     toValue: 0,
//                     duration: 250,
//                     useNativeDriver: true,
//                 }),
//                 Animated.timing(opacityAnim, {
//                     toValue: 1,
//                     duration: 250,
//                     useNativeDriver: true,
//                 })
//             ]).start();
//         } else {
//             Animated.parallel([
//                 Animated.timing(slideAnim, {
//                     toValue: -DRAWER_WIDTH,
//                     duration: 200,
//                     useNativeDriver: true,
//                 }),
//                 Animated.timing(opacityAnim, {
//                     toValue: 0,
//                     duration: 200,
//                     useNativeDriver: true,
//                 })
//             ]).start();
//         }
//     }, [isVisible]);
//
//     if (!isVisible) return null;
//
//     return (
//         <View style={styles.drawerContainer}>
//             <TouchableWithoutFeedback onPress={onClose}>
//                 <Animated.View style={[styles.backdrop, { opacity: opacityAnim }]} />
//             </TouchableWithoutFeedback>
//             <Animated.View
//                 style={[
//                     styles.drawerContent,
//                     { transform: [{ translateX: slideAnim }] }
//                 ]}
//             >
//                 {children}
//             </Animated.View>
//         </View>
//     );
// };
//
// export default function PlaylistsScreen() {
//     const router = useRouter();
//     const [selectedTab, setSelectedTab] = useState('Playlists');
//     const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//
//     // Mock playlist data matching the image
//     const playlists = [
//         {
//             id: '1',
//             title: 'Liked Songs',
//             subtitle: 'Playlist • 374 songs',
//             coverColor: ['#4C1D95', '#7C3AED'],
//             icon: 'heart',
//             iconColor: '#FFFFFF'
//         },
//         {
//             id: '2',
//             title: '<3',
//             subtitle: 'Playlist • Summi',
//             coverImage: require('../assets/images/playlist1.jpeg'),
//             hasImage: true
//         },
//         {
//             id: '3',
//             title: 'On Repeat',
//             subtitle: 'Playlist • Made for Summi',
//             coverColor: ['#EC4899', '#BE185D'],
//             icon: 'repeat',
//             iconColor: '#FFFFFF'
//         },
//         {
//             id: '4',
//             title: 'Local Files',
//             subtitle: 'Playlist • 0 tracks',
//             coverColor: ['#059669', '#10B981'],
//             icon: 'folder',
//             iconColor: '#FFFFFF'
//         },
//         {
//             id: '5',
//             title: 'Hot Hits Philippines',
//             subtitle: 'Playlist • Spotify',
//             coverImage: require('../assets/images/playlist2.jpeg'),
//             hasImage: true
//         },
//         {
//             id: '6',
//             title: 'taylor swift songs but she\'s in love',
//             subtitle: 'Playlist • hannah🌿🤍🖤',
//             coverImage: require('../assets/images/playlist3.png'),
//             hasImage: true
//         },
//         {
//             id: '7',
//             title: 'Love Me Not Radio',
//             subtitle: 'Playlist • Made for Summi',
//             coverImage: require('../assets/images/playlist4.jpg'),
//             hasImage: true
//         }
//     ];
//
//     const tabs = ['Playlists', 'Podcasts', 'Albums', 'Artists', 'Downloaded'];
//
//     const handlePlaylistPress = (playlist) => {
//         console.log(`Opening playlist: ${playlist.title}`);
//         // Navigate to playlist detail screen
//     };
//
//     const handleDrawerItemPress = (item) => {
//         setIsDrawerOpen(false);
//
//         switch(item) {
//             case 'profile':
//                 router.push('/Profile');
//                 break;
//             case 'playlists':
//                 // Already on playlists page
//                 break;
//             case 'settings':
//                 router.push('/Settings');
//                 break;
//             default:
//                 break;
//         }
//     };
//
//     const PlaylistCover = ({ playlist }) => {
//         if (playlist.hasImage) {
//             return (
//                 <Image
//                     source={playlist.coverImage}
//                     style={styles.playlistCover}
//                 />
//             );
//         }
//
//         return (
//             <View style={styles.playlistCover}>
//                 <LinearGradient
//                     colors={playlist.coverColor}
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 1 }}
//                     style={StyleSheet.absoluteFill}
//                 />
//                 <Ionicons name={playlist.icon} size={24} color={playlist.iconColor} />
//             </View>
//         );
//     };
//
//     const PlaylistItem = ({ item }) => (
//         <TouchableOpacity
//             style={styles.playlistItem}
//             onPress={() => handlePlaylistPress(item)}
//         >
//             <PlaylistCover playlist={item} />
//             <View style={styles.playlistInfo}>
//                 <Text style={styles.playlistTitle} numberOfLines={2}>{item.title}</Text>
//                 <Text style={styles.playlistSubtitle} numberOfLines={1}>{item.subtitle}</Text>
//             </View>
//         </TouchableOpacity>
//     );
//
//     const DrawerContent = () => (
//         <View style={styles.drawer}>
//             <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.5)" translucent />
//
//             {/* Profile Section */}
//             <TouchableOpacity
//                 style={styles.profileSection}
//                 onPress={() => handleDrawerItemPress('profile')}
//             >
//                 <Image
//                     source={require('../assets/images/soojin.jpeg')}
//                     style={styles.drawerProfileImage}
//                 />
//                 <View style={styles.profileInfo}>
//                     <Text style={styles.profileName}>Summi</Text>
//                     <Text style={styles.viewProfile}>View profile</Text>
//                 </View>
//             </TouchableOpacity>
//
//             {/* Navigation Items */}
//             <View style={styles.navigationSection}>
//                 <TouchableOpacity
//                     style={styles.navigationItem}
//                     onPress={() => handleDrawerItemPress('whats-new')}
//                 >
//                     <Ionicons name="flash" size={24} color="#FFFFFF" />
//                     <Text style={styles.navigationText}>What's new</Text>
//                 </TouchableOpacity>
//
//                 <TouchableOpacity
//                     style={styles.navigationItem}
//                     onPress={() => handleDrawerItemPress('recents')}
//                 >
//                     <Ionicons name="time" size={24} color="#FFFFFF" />
//                     <Text style={styles.navigationText}>Recents</Text>
//                 </TouchableOpacity>
//
//                 <TouchableOpacity
//                     style={styles.navigationItem}
//                     onPress={() => handleDrawerItemPress('settings')}
//                 >
//                     <Ionicons name="settings" size={24} color="#FFFFFF" />
//                     <Text style={styles.navigationText}>Settings and privacy</Text>
//                 </TouchableOpacity>
//             </View>
//
//             {/* Background overlay with playlists preview */}
//             <View style={styles.playlistsPreview}>
//                 {/* This shows a blurred/dimmed version of the playlists in the background */}
//             </View>
//         </View>
//     );
//
//     return (
//         <View style={styles.container}>
//             {/* Header */}
//             <View style={styles.header}>
//                 <View style={styles.headerLeft}>
//                     <TouchableOpacity
//                         style={styles.profilePic}
//                         onPress={() => setIsDrawerOpen(true)}
//                     >
//                         <Image
//                             source={require('../assets/images/soojin.jpeg')}
//                             style={styles.profileImage}
//                         />
//                     </TouchableOpacity>
//
//                     <Text style={styles.headerTitle}>Your Library</Text>
//                 </View>
//                 <View style={styles.headerRight}>
//                     <TouchableOpacity style={styles.headerButton}>
//                         <Ionicons name="search" size={24} color="#FFFFFF" />
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.headerButton}>
//                         <Ionicons name="add" size={24} color="#FFFFFF" />
//                     </TouchableOpacity>
//                 </View>
//             </View>
//
//             {/* Tabs */}
//             <View style={styles.tabsContainer}>
//                 <ScrollView
//                     horizontal
//                     showsHorizontalScrollIndicator={false}
//                     contentContainerStyle={styles.tabsContent}
//                 >
//                     {tabs.map(tab => (
//                         <TouchableOpacity
//                             key={tab}
//                             style={[
//                                 styles.tab,
//                                 selectedTab === tab && styles.activeTab
//                             ]}
//                             onPress={() => setSelectedTab(tab)}
//                         >
//                             <Text style={[
//                                 styles.tabText,
//                                 selectedTab === tab && styles.activeTabText
//                             ]}>{tab}</Text>
//                         </TouchableOpacity>
//                     ))}
//                 </ScrollView>
//             </View>
//
//             {/* Sort Section */}
//             <View style={styles.sortContainer}>
//                 <TouchableOpacity style={styles.sortButton}>
//                     <Ionicons name="swap-vertical" size={16} color="#FFFFFF" />
//                     <Text style={styles.sortText}>Recents</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.gridButton}>
//                     <Ionicons name="grid" size={20} color="#FFFFFF" />
//                 </TouchableOpacity>
//             </View>
//
//             {/* Playlists List */}
//             <FlatList
//                 data={playlists}
//                 keyExtractor={item => item.id}
//                 renderItem={({ item }) => <PlaylistItem item={item} />}
//                 style={styles.playlistsList}
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={styles.playlistsContent}
//             />
//
//             {/* Now Playing Bar */}
//             {/* <View style={styles.nowPlayingBar}>
//                 <View style={styles.nowPlayingContent}>
//                     <View style={styles.nowPlayingAlbum}>
//                         <View style={styles.albumCover}>
//                             <Ionicons name="musical-note" size={16} color="#FFFFFF" />
//                         </View>
//                         <View style={styles.nowPlayingInfo}>
//                             <Text style={styles.nowPlayingSong}>GO BABY</Text>
//                             <Text style={styles.nowPlayingArtist}>Justin Bieber</Text>
//                         </View>
//                     </View>
//                     <View style={styles.nowPlayingControls}>
//                         <TouchableOpacity>
//                             <Ionicons name="phone-portrait" size={20} color="#FFFFFF" />
//                         </TouchableOpacity>
//                         <TouchableOpacity>
//                             <Ionicons name="play" size={24} color="#FFFFFF" />
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//                 <View style={styles.progressBar}>
//                     <View style={styles.progress} />
//                 </View>
//             </View> */}
//
//             {/* Bottom Navigation */}
//             <View style={styles.bottomNav}>
//                 <TouchableOpacity style={styles.navItem}>
//                     <Ionicons name="home" size={24} color="rgba(255, 255, 255, 0.6)" />
//                     <Text style={styles.navText}>Home</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.navItem}>
//                     <Ionicons name="search" size={24} color="rgba(255, 255, 255, 0.6)" />
//                     <Text style={styles.navText}>Search</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
//                     <Ionicons name="library" size={24} color="#FFFFFF" />
//                     <Text style={[styles.navText, styles.activeNavText]}>Your Library</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.navItem}>
//                     <Ionicons name="add-circle" size={24} color="rgba(255, 255, 255, 0.6)" />
//                     <Text style={styles.navText}>Create</Text>
//                 </TouchableOpacity>
//             </View>
//
//             {/* Drawer Overlay */}
//             <DrawerOverlay isVisible={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
//                 <DrawerContent />
//             </DrawerOverlay>
//         </View>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#000000",
//     },
//
//     // Drawer Styles
//     drawerContainer: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         zIndex: 1000,
//     },
//     backdrop: {
//         ...StyleSheet.absoluteFillObject,
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     drawerContent: {
//         position: 'absolute',
//         left: 0,
//         top: 0,
//         bottom: 0,
//         width: DRAWER_WIDTH,
//         backgroundColor: '#1C1C1C',
//     },
//     drawer: {
//         flex: 1,
//         paddingTop: 50,
//     },
//     profileSection: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingHorizontal: 20,
//         paddingVertical: 20,
//         borderBottomWidth: 1,
//         borderBottomColor: 'rgba(255, 255, 255, 0.1)',
//         marginBottom: 10,
//     },
//     drawerProfileImage: {
//         width: 48,
//         height: 48,
//         borderRadius: 24,
//         marginRight: 16,
//     },
//     profileInfo: {
//         flex: 1,
//     },
//     profileName: {
//         fontSize: 18,
//         fontWeight: '700',
//         color: '#FFFFFF',
//         marginBottom: 4,
//     },
//     viewProfile: {
//         fontSize: 14,
//         color: 'rgba(255, 255, 255, 0.7)',
//     },
//     navigationSection: {
//         paddingTop: 10,
//     },
//     navigationItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingHorizontal: 20,
//         paddingVertical: 16,
//     },
//     navigationText: {
//         fontSize: 16,
//         color: '#FFFFFF',
//         marginLeft: 20,
//         fontWeight: '500',
//     },
//     playlistsPreview: {
//         flex: 1,
//         opacity: 0.1,
//     },
//
//     // Original Styles (keeping all existing styles)
//     header: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//         paddingTop: 50,
//         paddingHorizontal: 16,
//         paddingBottom: 16,
//     },
//     headerLeft: {
//         flexDirection: "row",
//         alignItems: "center",
//     },
//     profilePic: {
//         width: 32,
//         height: 32,
//         borderRadius: 16,
//         backgroundColor: "#1DB954",
//         alignItems: "center",
//         justifyContent: "center",
//         marginRight: 12,
//         overflow: "hidden",
//     },
//     profileImage: {
//         width: "100%",
//         height: "100%",
//         resizeMode: "cover",
//     },
//     headerTitle: {
//         fontSize: 22,
//         fontWeight: "700",
//         color: "#FFFFFF",
//     },
//     headerRight: {
//         flexDirection: "row",
//         gap: 8,
//     },
//     headerButton: {
//         width: 32,
//         height: 32,
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     tabsContainer: {
//         paddingHorizontal: 16,
//         marginBottom: 16,
//     },
//     tabsContent: {
//         gap: 12,
//     },
//     tab: {
//         backgroundColor: "rgba(255, 255, 255, 0.1)",
//         paddingHorizontal: 16,
//         paddingVertical: 8,
//         borderRadius: 20,
//     },
//     activeTab: {
//         backgroundColor: "#1DB954",
//     },
//     tabText: {
//         color: "rgba(255, 255, 255, 0.7)",
//         fontSize: 14,
//         fontWeight: "500",
//     },
//     activeTabText: {
//         color: "#000000",
//         fontWeight: "600",
//     },
//     sortContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//         paddingHorizontal: 16,
//         marginBottom: 8,
//     },
//     sortButton: {
//         flexDirection: "row",
//         alignItems: "center",
//         gap: 8,
//     },
//     sortText: {
//         color: "#FFFFFF",
//         fontSize: 14,
//         fontWeight: "500",
//     },
//     gridButton: {
//         padding: 4,
//     },
//     playlistsList: {
//         flex: 1,
//     },
//     playlistsContent: {
//         paddingHorizontal: 16,
//         paddingBottom: 100,
//     },
//     playlistItem: {
//         flexDirection: "row",
//         alignItems: "center",
//         paddingVertical: 8,
//         marginBottom: 4,
//     },
//     playlistCover: {
//         width: 56,
//         height: 56,
//         borderRadius: 4,
//         alignItems: "center",
//         justifyContent: "center",
//         marginRight: 12,
//         overflow: "hidden",
//     },
//     placeholderImage: {
//         width: "100%",
//         height: "100%",
//         backgroundColor: "#333333",
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     playlistInfo: {
//         flex: 1,
//     },
//     playlistTitle: {
//         fontSize: 16,
//         fontWeight: "500",
//         color: "#FFFFFF",
//         marginBottom: 2,
//         lineHeight: 20,
//     },
//     playlistSubtitle: {
//         fontSize: 14,
//         color: "rgba(255, 255, 255, 0.6)",
//         lineHeight: 18,
//     },
//     nowPlayingBar: {
//         position: "absolute",
//         bottom: 60,
//         left: 8,
//         right: 8,
//         backgroundColor: "#282828",
//         borderRadius: 8,
//     },
//     nowPlayingContent: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//         padding: 8,
//     },
//     nowPlayingAlbum: {
//         flexDirection: "row",
//         alignItems: "center",
//         flex: 1,
//     },
//     albumCover: {
//         width: 40,
//         height: 40,
//         backgroundColor: "#404040",
//         borderRadius: 4,
//         alignItems: "center",
//         justifyContent: "center",
//         marginRight: 8,
//     },
//     nowPlayingInfo: {
//         flex: 1,
//     },
//     logoImage: {
//         width: 140,
//         height: 140,
//     },
//     nowPlayingSong: {
//         color: "#FFFFFF",
//         fontSize: 14,
//         fontWeight: "500",
//     },
//     nowPlayingArtist: {
//         color: "rgba(255, 255, 255, 0.6)",
//         fontSize: 12,
//     },
//     nowPlayingControls: {
//         flexDirection: "row",
//         alignItems: "center",
//         gap: 16,
//     },
//     progressBar: {
//         height: 2,
//         backgroundColor: "rgba(255, 255, 255, 0.2)",
//     },
//     progress: {
//         height: "100%",
//         width: "40%",
//         backgroundColor: "#FFFFFF",
//     },
//     bottomNav: {
//         flexDirection: "row",
//         backgroundColor: "#000000",
//         paddingBottom: 20,
//         paddingTop: 8,
//         paddingHorizontal: 16,
//     },
//     navItem: {
//         flex: 1,
//         alignItems: "center",
//         gap: 4,
//     },
//     activeNavItem: {
//         // Active state styling
//     },
//     navText: {
//         color: "rgba(255, 255, 255, 0.6)",
//         fontSize: 11,
//         fontWeight: "500",
//     },
//     activeNavText: {
//         color: "#FFFFFF",
//     },
// });



import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    FlatList,
    Image,
    Animated,
    Dimensions,
    TouchableWithoutFeedback,
    StatusBar
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = SCREEN_WIDTH * 0.75;

const DrawerOverlay = ({ isVisible, onClose, children }) => {
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
    },

    // Drawer Styles
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
        backgroundColor: '#1C1C1C',
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
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
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
        color: '#FFFFFF',
        marginBottom: 4,
    },
    viewProfile: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
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
        color: '#FFFFFF',
        marginLeft: 20,
        fontWeight: '500',
    },
    playlistsPreview: {
        flex: 1,
        opacity: 0.1,
    },

    // Original Styles
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 50,
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    profilePic: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#1DB954",
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
        color: "#FFFFFF",
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
    },
    tabsContent: {
        gap: 12,
    },
    tab: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    activeTab: {
        backgroundColor: "#1DB954",
    },
    tabText: {
        color: "rgba(255, 255, 255, 0.7)",
        fontSize: 14,
        fontWeight: "500",
    },
    activeTabText: {
        color: "#000000",
        fontWeight: "600",
    },
    sortContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    sortButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    sortText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "500",
    },
    gridButton: {
        padding: 4,
    },
    playlistsList: {
        flex: 1,
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
    placeholderImage: {
        width: "100%",
        height: "100%",
        backgroundColor: "#333333",
        alignItems: "center",
        justifyContent: "center",
    },
    playlistInfo: {
        flex: 1,
    },
    playlistTitle: {
        fontSize: 16,
        fontWeight: "500",
        color: "#FFFFFF",
        marginBottom: 2,
        lineHeight: 20,
    },
    playlistSubtitle: {
        fontSize: 14,
        color: "rgba(255, 255, 255, 0.6)",
        lineHeight: 18,
    },
    nowPlayingBar: {
        position: "absolute",
        bottom: 60,
        left: 8,
        right: 8,
        backgroundColor: "#282828",
        borderRadius: 8,
    },
    nowPlayingContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 8,
    },
    nowPlayingAlbum: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    albumCover: {
        width: 40,
        height: 40,
        backgroundColor: "#404040",
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
    },
    nowPlayingInfo: {
        flex: 1,
    },
    logoImage: {
        width: 140,
        height: 140,
    },
    nowPlayingSong: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "500",
    },
    nowPlayingArtist: {
        color: "rgba(255, 255, 255, 0.6)",
        fontSize: 12,
    },
    nowPlayingControls: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    progressBar: {
        height: 2,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    progress: {
        height: "100%",
        width: "40%",
        backgroundColor: "#FFFFFF",
    },
    bottomNav: {
        flexDirection: "row",
        backgroundColor: "#000000",
        paddingBottom: 20,
        paddingTop: 8,
        paddingHorizontal: 16,
    },
    navItem: {
        flex: 1,
        alignItems: "center",
        gap: 4,
    },
    activeNavItem: {
        // Active state styling
    },
    navText: {
        color: "rgba(255, 255, 255, 0.6)",
        fontSize: 11,
        fontWeight: "500",
    },
    activeNavText: {
        color: "#FFFFFF",
    },
});

    return (
        <View style={styles.drawerContainer}>
            <TouchableWithoutFeedback onPress={onClose}>
                <Animated.View style={[styles.backdrop, { opacity: opacityAnim }]} />
            </TouchableWithoutFeedback>
            <Animated.View
                style={[
                    styles.drawerContent,
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
    const [selectedTab, setSelectedTab] = useState('Playlists');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Mock playlist data matching the image
    const playlists = [
        {
            id: '1',
            title: 'Liked Songs',
            subtitle: 'Playlist • 374 songs',
            coverColor: ['#4C1D95', '#7C3AED'],
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
        // Navigate to playlist detail screen with parameters
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
                // Already on playlists page
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
            <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.5)" translucent />

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
                    <Ionicons name="flash" size={24} color="#FFFFFF" />
                    <Text style={styles.navigationText}>What's new</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navigationItem}
                    onPress={() => handleDrawerItemPress('recents')}
                >
                    <Ionicons name="time" size={24} color="#FFFFFF" />
                    <Text style={styles.navigationText}>Recents</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navigationItem}
                    onPress={() => handleDrawerItemPress('settings')}
                >
                    <Ionicons name="settings" size={24} color="#FFFFFF" />
                    <Text style={styles.navigationText}>Settings and privacy</Text>
                </TouchableOpacity>
            </View>

            {/* Background overlay with playlists preview */}
            <View style={styles.playlistsPreview}>
                {/* This shows a blurred/dimmed version of the playlists in the background */}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
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
                        <Ionicons name="search" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerButton}>
                        <Ionicons name="add" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
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
                    <Ionicons name="swap-vertical" size={16} color="#FFFFFF" />
                    <Text style={styles.sortText}>Recents</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.gridButton}>
                    <Ionicons name="grid" size={20} color="#FFFFFF" />
                </TouchableOpacity>
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
                    <Ionicons name="home" size={24} color="rgba(255, 255, 255, 0.6)" />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="search" size={24} color="rgba(255, 255, 255, 0.6)" />
                    <Text style={styles.navText}>Search</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
                    <Ionicons name="library" size={24} color="#FFFFFF" />
                    <Text style={[styles.navText, styles.activeNavText]}>Your Library</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="add-circle" size={24} color="rgba(255, 255, 255, 0.6)" />
                    <Text style={styles.navText}>Create</Text>
                </TouchableOpacity>
            </View>

            {/* Drawer Overlay */}
            <DrawerOverlay isVisible={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                <DrawerContent />
            </DrawerOverlay>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
    },

    // Drawer Styles
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
        backgroundColor: '#1C1C1C',
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
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
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
        color: '#FFFFFF',
        marginBottom: 4,
    },
    viewProfile: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
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
        color: '#FFFFFF',
        marginLeft: 20,
        fontWeight: '500',
    },
    playlistsPreview: {
        flex: 1,
        opacity: 0.1,
    },

    // Original Styles (keeping all existing styles)
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 50,
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    profilePic: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#1DB954",
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
        color: "#FFFFFF",
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
    },
    tabsContent: {
        gap: 12,
    },
    tab: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    activeTab: {
        backgroundColor: "#1DB954",
    },
    tabText: {
        color: "rgba(255, 255, 255, 0.7)",
        fontSize: 14,
        fontWeight: "500",
    },
    activeTabText: {
        color: "#000000",
        fontWeight: "600",
    },
    sortContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    sortButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    sortText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "500",
    },
    gridButton: {
        padding: 4,
    },
    playlistsList: {
        flex: 1,
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
    placeholderImage: {
        width: "100%",
        height: "100%",
        backgroundColor: "#333333",
        alignItems: "center",
        justifyContent: "center",
    },
    playlistInfo: {
        flex: 1,
    },
    playlistTitle: {
        fontSize: 16,
        fontWeight: "500",
        color: "#FFFFFF",
        marginBottom: 2,
        lineHeight: 20,
    },
    playlistSubtitle: {
        fontSize: 14,
        color: "rgba(255, 255, 255, 0.6)",
        lineHeight: 18,
    },
    nowPlayingBar: {
        position: "absolute",
        bottom: 60,
        left: 8,
        right: 8,
        backgroundColor: "#282828",
        borderRadius: 8,
    },
    nowPlayingContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 8,
    },
    nowPlayingAlbum: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    albumCover: {
        width: 40,
        height: 40,
        backgroundColor: "#404040",
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
    },
    nowPlayingInfo: {
        flex: 1,
    },
    logoImage: {
        width: 140,
        height: 140,
    },
    nowPlayingSong: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "500",
    },
    nowPlayingArtist: {
        color: "rgba(255, 255, 255, 0.6)",
        fontSize: 12,
    },
    nowPlayingControls: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    progressBar: {
        height: 2,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    progress: {
        height: "100%",
        width: "40%",
        backgroundColor: "#FFFFFF",
    },
    bottomNav: {
        flexDirection: "row",
        backgroundColor: "#000000",
        paddingBottom: 20,
        paddingTop: 8,
        paddingHorizontal: 16,
    },
    navItem: {
        flex: 1,
        alignItems: "center",
        gap: 4,
    },
    activeNavItem: {
        // Active state styling
    },
    navText: {
        color: "rgba(255, 255, 255, 0.6)",
        fontSize: 11,
        fontWeight: "500",
    },
    activeNavText: {
        color: "#FFFFFF",
    },
});
