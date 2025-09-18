// import React from "react";
// import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
//
// export default function ProfileScreen() {
//     const router = useRouter();
//
//     const handleEditProfile = () => {
//         console.log("Edit Profile pressed");
//     };
//
//     const handleNavigateBack = () => {
//         router.back();
//     };
//
//     const handleSeeAllPlaylists = () => {
//         console.log("See all playlists");
//     };
//
//     const handleSeeAllArtists = () => {
//         console.log("See all artists");
//     };
//
//     // Mock data
//     const playlists = [
//         {
//             id: '1',
//             title: '<3',
//             subtitle: '0 saves • Summi',
//             coverImage: require('../assets/images/playlist1.jpeg')
//         },
//         {
//             id: '2',
//             title: '♥',
//             subtitle: '0 saves • Summi',
//             coverImage: require('../assets/images/playlist2.jpeg')
//         }
//     ];
//
//     const recentlyPlayedArtists = [
//         {
//             id: '1',
//             name: 'The Marias',
//             followers: '3,370,622 followers',
//             image: require('../assets/images/soojin2.webp')
//         },
//         {
//             id: '2',
//             name: 'Charli xcx',
//             followers: '6,062,732 followers',
//             image: require('../assets/images/soojin1.jpeg')
//         },
//         {
//             id: '3',
//             name: 'thủy',
//             followers: '415,905 followers',
//             image: require('../assets/images/soojin3.jpg')
//         },
//         {
//             id: '4',
//             name: 'Malcolm Todd',
//             followers: '664,152 followers',
//             image: require('../assets/images/soojin4.jpg')
//         }
//     ];
//
//     const PlaylistItem = ({ playlist }) => (
//         <TouchableOpacity style={styles.playlistItem}>
//             <View style={styles.playlistCover}>
//                         {playlist.coverImage ? (
//                             <Image source={playlist.coverImage} style={styles.playlistCover} />
//                         ) : (
//                             <View style={styles.placeholderImage}>
//                                 <Ionicons name="musical-notes" size={16} color="rgba(255, 255, 255, 0.7)" />
//                             </View>
//                         )}
//                     </View>
//             <View style={styles.playlistInfo}>
//                 <Text style={styles.playlistTitle}>{playlist.title}</Text>
//                 <Text style={styles.playlistSubtitle}>{playlist.subtitle}</Text>
//             </View>
//         </TouchableOpacity>
//     );
//
//     const ArtistItem = ({ artist }) => (
//         <TouchableOpacity style={styles.artistItem}>
//             <View style={styles.artistImage}>
//                         {artist.image ? (
//                             <Image source={artist.image} style={styles.artistImage} />
//                         ) : (
//                             <View style={styles.placeholderImage}>
//                                 <Ionicons name="person" size={20} color="rgba(255, 255, 255, 0.7)" />
//                             </View>
//                         )}
//                     </View>
//             <View style={styles.artistInfo}>
//                 <Text style={styles.artistName}>{artist.name}</Text>
//                 <Text style={styles.artistFollowers}>{artist.followers}</Text>
//             </View>
//         </TouchableOpacity>
//     );
//
//     return (
//         <View style={styles.container}>
//             {/* Header */}
//             <View style={styles.header}>
//                 <TouchableOpacity
//                     style={styles.backButton}
//                     onPress={handleNavigateBack}
//                 >
//                     <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
//                 </TouchableOpacity>
//                 <Text style={styles.headerTitle}>Summi</Text>
//                 <TouchableOpacity style={styles.menuButton}
//                     onPress={() => router.push('/Settings')}>
//                     <Ionicons name="ellipsis-horizontal" size={24} color="#FFFFFF" />
//                 </TouchableOpacity>
//             </View>
//
//             <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
//                 {/* Profile Section */}
//                 <View style={styles.profileSection}>
//                     <View style={styles.profileImageContainer}>
//                         <View style={styles.profileImage}>
//                             <View style={styles.placeholderProfileImage}>
//                                 <Image
//                                   source={require('../assets/images/soojin.jpeg')}
//                                   style={styles.logoImage}
//                                 />
//                             </View>
//                         </View>
//                     </View>
//
//                     <Text style={styles.profileName}>Summi</Text>
//
//                     <View style={styles.statsContainer}>
//                         <Text style={styles.statsText}>10 followers • 32 following</Text>
//                     </View>
//
//                     {/* Action Buttons */}
//                     <View style={styles.actionButtons}>
//                         <TouchableOpacity style={styles.editButton} onPress={() => router.push('/EditProfile')}>>
//                             <Text style={styles.editButtonText}>Edit</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity style={styles.shareButton}>
//                             <Ionicons name="share-outline" size={20} color="#FFFFFF" />
//                         </TouchableOpacity>
//                         <TouchableOpacity style={styles.moreButton}>
//                             <Ionicons name="ellipsis-horizontal" size={20} color="#FFFFFF" />
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//
//                 {/* Playlists Section */}
//                 <View style={styles.section}>
//                     <View style={styles.sectionHeader}>
//                         <Text style={styles.sectionTitle}>Playlists</Text>
//                     </View>
//                     {playlists.map(playlist => (
//                         <PlaylistItem key={playlist.id} playlist={playlist} />
//                     ))}
//                     <TouchableOpacity style={styles.seeAllButton} onPress={handleSeeAllPlaylists}>
//                         <Text style={styles.seeAllButtonText}>See all playlists</Text>
//                     </TouchableOpacity>
//                 </View>
//
//                 {/* Recently Played Artists Section */}
//                 <View style={styles.section}>
//                     <View style={styles.sectionHeader}>
//                         <Text style={styles.sectionTitle}>Recently played artists</Text>
//                     </View>
//                     {recentlyPlayedArtists.map(artist => (
//                         <ArtistItem key={artist.id} artist={artist} />
//                     ))}
//                     <TouchableOpacity style={styles.seeAllButton} onPress={handleSeeAllArtists}>
//                         <Text style={styles.seeAllButtonText}>See all artists</Text>
//                     </TouchableOpacity>
//                 </View>
//             </ScrollView>
//
//             {/* Now Playing Bar */}
//             {/*
//             <View style={styles.nowPlayingBar}>
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
//                 <TouchableOpacity style={styles.navItem}>
//                     <Ionicons name="library" size={24} color="rgba(255, 255, 255, 0.6)" />
//                     <Text style={styles.navText}>Your Library</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.navItem}>
//                     <Ionicons name="add-circle" size={24} color="rgba(255, 255, 255, 0.6)" />
//                     <Text style={styles.navText}>Create</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#000000",
//     },
//     header: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//         paddingTop: 50,
//         paddingHorizontal: 16,
//         paddingBottom: 16,
//     },
//     backButton: {
//         width: 32,
//         height: 32,
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     headerTitle: {
//         fontSize: 18,
//         fontWeight: "600",
//         color: "#FFFFFF",
//     },
//     menuButton: {
//         width: 32,
//         height: 32,
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     scrollContainer: {
//         flex: 1,
//     },
//     profileSection: {
//         alignItems: "center",
//         paddingHorizontal: 16,
//         paddingBottom: 24,
//     },
//     profileImageContainer: {
//         marginBottom: 16,
//     },
//     profileImage: {
//         width: 120,
//         height: 120,
//         borderRadius: 60,
//         overflow: "hidden",
//     },
//     placeholderProfileImage: {
//         width: "100%",
//         height: "100%",
//         backgroundColor: "#333333",
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     profileName: {
//         fontSize: 24,
//         fontWeight: "700",
//         color: "#FFFFFF",
//         marginBottom: 8,
//     },
//     statsContainer: {
//         marginBottom: 16,
//     },
//     statsText: {
//         fontSize: 14,
//         color: "rgba(255, 255, 255, 0.7)",
//     },
//     actionButtons: {
//         flexDirection: "row",
//         gap: 12,
//     },
//     editButton: {
//         backgroundColor: "rgba(255, 255, 255, 0.1)",
//         borderWidth: 1,
//         borderColor: "rgba(255, 255, 255, 0.2)",
//         borderRadius: 20,
//         paddingHorizontal: 24,
//         paddingVertical: 8,
//     },
//     editButtonText: {
//         color: "#FFFFFF",
//         fontSize: 14,
//         fontWeight: "600",
//     },
//     shareButton: {
//         backgroundColor: "rgba(255, 255, 255, 0.1)",
//         borderWidth: 1,
//         borderColor: "rgba(255, 255, 255, 0.2)",
//         borderRadius: 20,
//         width: 36,
//         height: 36,
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     moreButton: {
//         backgroundColor: "rgba(255, 255, 255, 0.1)",
//         borderWidth: 1,
//         borderColor: "rgba(255, 255, 255, 0.2)",
//         borderRadius: 20,
//         width: 36,
//         height: 36,
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     section: {
//         paddingHorizontal: 16,
//         marginBottom: 32,
//     },
//     sectionHeader: {
//         marginBottom: 16,
//     },
//     sectionTitle: {
//         fontSize: 20,
//         fontWeight: "700",
//         color: "#FFFFFF",
//     },
//     playlistItem: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginBottom: 12,
//     },
//     playlistCover: {
//         width: 56,
//         height: 56,
//         borderRadius: 4,
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
//     },
//     playlistSubtitle: {
//         fontSize: 14,
//         color: "rgba(255, 255, 255, 0.6)",
//     },
//     artistItem: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginBottom: 16,
//     },
//     artistImage: {
//         width: 56,
//         height: 56,
//         borderRadius: 28,
//         marginRight: 12,
//         overflow: "hidden",
//     },
//     artistInfo: {
//         flex: 1,
//     },
//     artistName: {
//         fontSize: 16,
//         fontWeight: "500",
//         color: "#FFFFFF",
//         marginBottom: 2,
//     },
//     artistFollowers: {
//         fontSize: 14,
//         color: "rgba(255, 255, 255, 0.6)",
//     },
//     seeAllButton: {
//         backgroundColor: "rgba(255, 255, 255, 0.1)",
//         borderWidth: 1,
//         borderColor: "rgba(255, 255, 255, 0.2)",
//         borderRadius: 20,
//         paddingVertical: 12,
//         paddingHorizontal: 24,
//         alignSelf: "center",
//         marginTop: 8,
//     },
//     seeAllButtonText: {
//         color: "#FFFFFF",
//         fontSize: 14,
//         fontWeight: "600",
//     },
//     nowPlayingBar: {
//         position: "absolute",
//         bottom: 60,
//         left: 8,
//         right: 8,
//         backgroundColor: "#282828",
//         borderRadius: 8,
//     },
//     logoImage: {
//         width: 140,
//         height: 140,
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
//     navText: {
//         color: "rgba(255, 255, 255, 0.6)",
//         fontSize: 11,
//         fontWeight: "500",
//     },
// });


import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

// Default profile image
const DEFAULT_PROFILE_IMAGE = require('../assets/images/soojin.jpeg');

export default function ProfileScreen() {
    const router = useRouter();

    // Profile state
    const [profileData, setProfileData] = useState({
        username: 'Summi',
        email: '',
        genres: [],
        profileImage: null,
    });

    // Load profile data on screen focus
    useFocusEffect(
        React.useCallback(() => {
            loadProfileData();
        }, [])
    );

    const loadProfileData = async () => {
        try {
            const savedProfile = await AsyncStorage.getItem('profileData');
            if (savedProfile) {
                const parsedProfile = JSON.parse(savedProfile);
                setProfileData({
                    username: parsedProfile.username || 'Summi',
                    email: parsedProfile.email || '',
                    genres: parsedProfile.genres || [],
                    profileImage: parsedProfile.profileImage || null,
                });
            }
        } catch (error) {
            console.error('Failed to load profile data:', error);
        }
    };

    const handleEditProfile = () => {
        router.push('/EditProfile');
    };

    const handleNavigateBack = () => {
        router.back();
    };

    const handleSeeAllPlaylists = () => {
        console.log("See all playlists");
    };

    const handleSeeAllArtists = () => {
        console.log("See all artists");
    };

    // Mock data
    const playlists = [
        {
            id: '1',
            title: '<3',
            subtitle: `0 saves • ${profileData.username}`,
            coverImage: require('../assets/images/playlist1.jpeg')
        },
        {
            id: '2',
            title: '♥',
            subtitle: `0 saves • ${profileData.username}`,
            coverImage: require('../assets/images/playlist2.jpeg')
        }
    ];

    const recentlyPlayedArtists = [
        {
            id: '1',
            name: 'The Marias',
            followers: '3,370,622 followers',
            image: require('../assets/images/soojin2.webp')
        },
        {
            id: '2',
            name: 'Charli xcx',
            followers: '6,062,732 followers',
            image: require('../assets/images/soojin1.jpeg')
        },
        {
            id: '3',
            name: 'thủy',
            followers: '415,905 followers',
            image: require('../assets/images/soojin3.jpg')
        },
        {
            id: '4',
            name: 'Malcolm Todd',
            followers: '664,152 followers',
            image: require('../assets/images/soojin4.jpg')
        }
    ];

    const PlaylistItem = ({ playlist }) => (
        <TouchableOpacity style={styles.playlistItem}>
            <View style={styles.playlistCover}>
                        {playlist.coverImage ? (
                            <Image source={playlist.coverImage} style={styles.playlistCover} />
                        ) : (
                            <View style={styles.placeholderImage}>
                                <Ionicons name="musical-notes" size={16} color="rgba(255, 255, 255, 0.7)" />
                            </View>
                        )}
                    </View>
            <View style={styles.playlistInfo}>
                <Text style={styles.playlistTitle}>{playlist.title}</Text>
                <Text style={styles.playlistSubtitle}>{playlist.subtitle}</Text>
            </View>
        </TouchableOpacity>
    );

    const ArtistItem = ({ artist }) => (
        <TouchableOpacity style={styles.artistItem}>
            <View style={styles.artistImage}>
                        {artist.image ? (
                            <Image source={artist.image} style={styles.artistImage} />
                        ) : (
                            <View style={styles.placeholderImage}>
                                <Ionicons name="person" size={20} color="rgba(255, 255, 255, 0.7)" />
                            </View>
                        )}
                    </View>
            <View style={styles.artistInfo}>
                <Text style={styles.artistName}>{artist.name}</Text>
                <Text style={styles.artistFollowers}>{artist.followers}</Text>
            </View>
        </TouchableOpacity>
    );

    // Profile image source
    const getProfileImageSource = () => {
        if (profileData.profileImage) {
            return { uri: profileData.profileImage };
        }
        return DEFAULT_PROFILE_IMAGE;
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleNavigateBack}
                >
                    <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{profileData.username}</Text>
                <TouchableOpacity style={styles.menuButton}
                    onPress={() => router.push('/Settings')}>
                    <Ionicons name="ellipsis-horizontal" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <View style={styles.profileImageContainer}>
                        <View style={styles.profileImage}>
                            <View style={styles.placeholderProfileImage}>
                                <Image
                                  source={getProfileImageSource()}
//                                   source={DEFAULT_PROFILE_IMAGE}
                                  style={styles.logoImage}
                                />
                            </View>
                        </View>
                    </View>

                    <Text style={styles.profileName}>{profileData.username}</Text>

                    <View style={styles.statsContainer}>
                        <Text style={styles.statsText}>10 followers • 32 following</Text>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionButtons}>
                        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                            <Text style={styles.editButtonText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.shareButton}>
                            <Ionicons name="share-outline" size={20} color="#FFFFFF" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.moreButton}>
                            <Ionicons name="ellipsis-horizontal" size={20} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Favorite Genres Section */}
                {profileData.genres.length > 0 && (
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Favorite Genres</Text>
                        </View>
                        <View style={styles.genresContainer}>
                            {profileData.genres.map((genre, index) => (
                                <View key={index} style={styles.genreChip}>
                                    <Text style={styles.genreChipText}>{genre}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* Playlists Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Playlists</Text>
                    </View>
                    {playlists.map(playlist => (
                        <PlaylistItem key={playlist.id} playlist={playlist} />
                    ))}
                    <TouchableOpacity style={styles.seeAllButton} onPress={handleSeeAllPlaylists}>
                        <Text style={styles.seeAllButtonText}>See all playlists</Text>
                    </TouchableOpacity>
                </View>

                {/* Recently Played Artists Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recently played artists</Text>
                    </View>
                    {recentlyPlayedArtists.map(artist => (
                        <ArtistItem key={artist.id} artist={artist} />
                    ))}
                    <TouchableOpacity style={styles.seeAllButton} onPress={handleSeeAllArtists}>
                        <Text style={styles.seeAllButtonText}>See all artists</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

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
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="library" size={24} color="rgba(255, 255, 255, 0.6)" />
                    <Text style={styles.navText}>Your Library</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="add-circle" size={24} color="rgba(255, 255, 255, 0.6)" />
                    <Text style={styles.navText}>Create</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 50,
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    backButton: {
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#FFFFFF",
    },
    menuButton: {
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
    },
    scrollContainer: {
        flex: 1,
    },
    profileSection: {
        alignItems: "center",
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
    profileImageContainer: {
        marginBottom: 16,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: "hidden",
    },
    placeholderProfileImage: {
        width: "100%",
        height: "100%",
        backgroundColor: "#333333",
        alignItems: "center",
        justifyContent: "center",
    },
    logoImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    profileName: {
        fontSize: 24,
        fontWeight: "700",
        color: "#FFFFFF",
        marginBottom: 8,
    },
    statsContainer: {
        marginBottom: 16,
    },
    statsText: {
        fontSize: 14,
        color: "rgba(255, 255, 255, 0.7)",
    },
    actionButtons: {
        flexDirection: "row",
        gap: 12,
    },
    editButton: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 20,
        paddingHorizontal: 24,
        paddingVertical: 8,
    },
    editButtonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "600",
    },
    shareButton: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 20,
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
    },
    moreButton: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 20,
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
    },
    section: {
        paddingHorizontal: 16,
        marginBottom: 32,
    },
    sectionHeader: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#FFFFFF",
    },
    genresContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 8,
    },
    genreChip: {
        backgroundColor: "#1DB954",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    genreChipText: {
        color: "#000000",
        fontSize: 12,
        fontWeight: "600",
    },
    playlistItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    playlistCover: {
        width: 56,
        height: 56,
        borderRadius: 4,
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
    },
    playlistSubtitle: {
        fontSize: 14,
        color: "rgba(255, 255, 255, 0.6)",
    },
    artistItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    artistImage: {
        width: 56,
        height: 56,
        borderRadius: 28,
        marginRight: 12,
        overflow: "hidden",
    },
    artistInfo: {
        flex: 1,
    },
    artistName: {
        fontSize: 16,
        fontWeight: "500",
        color: "#FFFFFF",
        marginBottom: 2,
    },
    artistFollowers: {
        fontSize: 14,
        color: "rgba(255, 255, 255, 0.6)",
    },
    seeAllButton: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignSelf: "center",
        marginTop: 8,
    },
    seeAllButtonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "600",
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
    navText: {
        color: "rgba(255, 255, 255, 0.6)",
        fontSize: 11,
        fontWeight: "500",
    },
});