import React, { useState, useEffect, useReducer, useCallback, useMemo } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, FlatList, Image, TextInput, Alert, StatusBar, Dimensions,
  TouchableWithoutFeedback, Keyboard
} from 'react-native';

import { PanGestureHandler, State } from 'react-native-gesture-handler'; // ✅
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
  useAnimatedGestureHandler,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../hooks/useTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Mock song data for search suggestions
const SUGGESTED_SONGS = [
  { id: '1', title: 'Muito', artist: 'Cup of Joe', cover: require('../assets/images/playlist1.jpeg') },
  { id: '2', title: "You'll Be in My Heart", artist: 'NIKI', cover: require('../assets/images/playlist2.jpeg') },
  { id: '3', title: 'back to friends', artist: 'sombr', cover: require('../assets/images/playlist3.png') },
  { id: '4', title: 'Golden', artist: 'HUNTR/X, EJAE, AUDREY NUNA, REIA', cover: require('../assets/images/playlist4.jpg') },
  { id: '5', title: 'What It Sounds Like', artist: 'HUNTR/X, EJAE, AUDREY NUNA, REIA', cover: require('../assets/images/playlist1.jpeg') },
  { id: '6', title: 'Umaasa', artist: 'Calein', cover: require('../assets/images/playlist2.jpeg') },
  { id: '7', title: 'Soda Pop', artist: 'Saja Boys, Andrew Choi, Neckwav, Danny', cover: require('../assets/images/playlist3.png') },
  { id: '8', title: 'Love Me Not', artist: 'Ravyn Lenae', cover: require('../assets/images/playlist4.jpg') },
  { id: '9', title: 'Naiilang', artist: 'Le John', cover: require('../assets/images/playlist1.jpeg') },
  { id: '10', title: 'Love, Maybe', artist: 'Unknown Artist', cover: require('../assets/images/playlist2.jpeg') }
];

// Reducer for playlist state management with undo/redo
const playlistReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'ADD_SONG':
      const newStateAdd = {
        ...state,
        songs: [...state.songs, payload],
        history: [...state.history.slice(0, state.historyIndex + 1), {
          type: 'ADD_SONG',
          song: payload,
          timestamp: Date.now()
        }],
        historyIndex: state.historyIndex + 1
      };
      return newStateAdd;

    case 'REMOVE_SONG':
      const songToRemove = state.songs.find(song => song.id === payload);
      const newStateRemove = {
        ...state,
        songs: state.songs.filter(song => song.id !== payload),
        history: [...state.history.slice(0, state.historyIndex + 1), {
          type: 'REMOVE_SONG',
          song: songToRemove,
          timestamp: Date.now()
        }],
        historyIndex: state.historyIndex + 1
      };
      return newStateRemove;

    case 'UNDO':
      if (state.historyIndex >= 0) {
        const lastAction = state.history[state.historyIndex];
        let newSongs = [...state.songs];

        if (lastAction.type === 'ADD_SONG') {
          newSongs = newSongs.filter(song => song.id !== lastAction.song.id);
        } else if (lastAction.type === 'REMOVE_SONG') {
          newSongs.push(lastAction.song);
        }

        return {
          ...state,
          songs: newSongs,
          historyIndex: state.historyIndex - 1
        };
      }
      return state;

    case 'REDO':
      if (state.historyIndex < state.history.length - 1) {
        const nextAction = state.history[state.historyIndex + 1];
        let newSongs = [...state.songs];

        if (nextAction.type === 'ADD_SONG') {
          newSongs.push(nextAction.song);
        } else if (nextAction.type === 'REMOVE_SONG') {
          newSongs = newSongs.filter(song => song.id !== nextAction.song.id);
        }

        return {
          ...state,
          songs: newSongs,
          historyIndex: state.historyIndex + 1
        };
      }
      return state;

    case 'CLEAR_PLAYLIST':
      const newStateClear = {
        ...state,
        songs: [],
        history: [...state.history.slice(0, state.historyIndex + 1), {
          type: 'CLEAR_PLAYLIST',
          songs: state.songs,
          timestamp: Date.now()
        }],
        historyIndex: state.historyIndex + 1
      };
      return newStateClear;

    case 'RESTORE_STATE':
      return payload;

    default:
      return state;
  }
};

// Initial state
const initialState = {
  songs: [],
  history: [],
  historyIndex: -1
};

// Memoized song item component for performance optimization
const SongItem = React.memo(({ song, onRemove, index, theme }) => {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      scale.value = withSpring(0.95);
    },
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: (event) => {
      scale.value = withSpring(1);

      if (event.translationX < -100) {
        // Swipe left to delete
        translateX.value = withTiming(-SCREEN_WIDTH);
        opacity.value = withTiming(0, undefined, () => {
          runOnJS(onRemove)(song.id);
        });
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const deleteOpacity = interpolate(
      translateX.value,
      [-100, -50, 0],
      [1, 0.7, 0],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { translateX: translateX.value },
        { scale: scale.value }
      ],
      opacity: opacity.value,
    };
  });

  const deleteButtonStyle = useAnimatedStyle(() => {
    const deleteOpacity = interpolate(
      translateX.value,
      [-100, -50, 0],
      [1, 0.7, 0],
      Extrapolate.CLAMP
    );

    return {
      opacity: deleteOpacity,
    };
  });

  return (
    <View style={styles.songItemContainer}>
      <Animated.View style={[styles.deleteButton, deleteButtonStyle]}>
        <Ionicons name="trash" size={20} color="#FF3B30" />
      </Animated.View>

      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.songItem, animatedStyle]}>
          <View style={styles.songCover}>
            <Image source={song.cover} style={styles.songCoverImage} />
          </View>
          <View style={styles.songInfo}>
            <Text style={styles.songTitle} numberOfLines={1}>{song.title}</Text>
            <Text style={styles.songArtist} numberOfLines={1}>{song.artist}</Text>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="ellipsis-horizontal" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
});

export default function PlaylistScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { theme } = useTheme();
  const [state, dispatch] = useReducer(playlistReducer, initialState);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddSongs, setShowAddSongs] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const hasImage = params.hasImage === 'true' || params.hasImage === true;
  const coverImage = hasImage && params.coverImage ? params.coverImage : null;
  const coverColor = params.coverColor ? JSON.parse(params.coverColor) : ['#4C1D95', '#7C3AED'];
  const icon = params.icon || "musical-notes";
  const iconColor = params.iconColor || "#FFFFFF";

  // Get playlist info from params (with type check to fix <Text> string error)
  const playlistTitle = typeof params.title === 'string' ? params.title : 'Playlist';
  const playlistSubtitle = typeof params.subtitle === 'string' ? params.subtitle : 'Playlist';


  // Animation values
  const headerOpacity = useSharedValue(1);
  const addButtonScale = useSharedValue(1);

  // Load playlist data from AsyncStorage
  useEffect(() => {
    const loadPlaylistData = async () => {
      try {
        const storageKey = `playlist_${playlistTitle.replace(/[^a-zA-Z0-9]/g, '_')}`;
        const savedData = await AsyncStorage.getItem(storageKey);

        if (savedData) {
          const parsedData = JSON.parse(savedData);
          dispatch({ type: 'RESTORE_STATE', payload: parsedData });
        }
      } catch (error) {
        console.error('Error loading playlist data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPlaylistData();
  }, [playlistTitle]);

  // Save playlist data to AsyncStorage whenever state changes
  useEffect(() => {
    const savePlaylistData = async () => {
      if (!isLoading) {
        try {
          const storageKey = `playlist_${playlistTitle.replace(/[^a-zA-Z0-9]/g, '_')}`;
          await AsyncStorage.setItem(storageKey, JSON.stringify(state));
        } catch (error) {
          console.error('Error saving playlist data:', error);
        }
      }
    };

    savePlaylistData();
  }, [state, isLoading, playlistTitle]);

  // Filtered songs for search
  const filteredSongs = useMemo(() => {
    if (!searchQuery.trim()) return SUGGESTED_SONGS;

    return SUGGESTED_SONGS.filter(song =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleAddSong = useCallback((song) => {
    // Check if song already exists in playlist
    const songExists = state.songs.some(existingSong => existingSong.id === song.id);

    if (songExists) {
      Alert.alert('Song Already Added', 'This song is already in your playlist.');
      return;
    }

    dispatch({ type: 'ADD_SONG', payload: song });

    // Animate add button
    addButtonScale.value = withSpring(0.8, undefined, () => {
      addButtonScale.value = withSpring(1);
    });

//     setShowAddSongs(false);
    setSearchQuery('');
  }, [state.songs]);

  const handleRemoveSong = useCallback((songId) => {
    dispatch({ type: 'REMOVE_SONG', payload: songId });
  }, []);

  const handleUndo = useCallback(() => {
    dispatch({ type: 'UNDO' });
  }, []);

  const handleRedo = useCallback(() => {
    dispatch({ type: 'REDO' });
  }, []);

  const handleClearPlaylist = useCallback(() => {
    Alert.alert(
      'Clear Playlist',
      'Are you sure you want to remove all songs from this playlist?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: () => dispatch({ type: 'CLEAR_PLAYLIST' }) }
      ]
    );
  }, []);

  const animatedAddButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: addButtonScale.value }]
  }));

  const canUndo = state.historyIndex >= 0;
  const canRedo = state.historyIndex < state.history.length - 1;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    loadingContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      color: theme.colors.text,
      fontSize: 16,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 50,
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    backButton: {
      padding: 4,
    },
    headerCenter: {
      flex: 1,
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text,
    },
    headerActions: {
      flexDirection: 'row',
      gap: 8,
    },
    headerButton: {
      padding: 4,
    },
    disabledButton: {
      opacity: 0.5,
    },
    playlistInfo: {
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 24,
    },
    playlistCoverLarge: {
      width: 200,
      height: 200,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
      overflow: 'hidden',
    },
    playlistTitleLarge: {
      fontSize: 24,
      fontWeight: '700',
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: 4,
    },
    playlistSubtitleLarge: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: 8,
    },
    songCount: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
    actionButtons: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingBottom: 24,
      gap: 16,
    },
    playButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: theme.colors.accent,
      alignItems: 'center',
      justifyContent: 'center',
    },
    shuffleButton: {
      padding: 12,
    },
    addSongButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    clearButton: {
      padding: 12,
    },
    emptyState: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 32,
    },
    emptyStateTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.colors.text,
      marginTop: 16,
      marginBottom: 8,
    },
    emptyStateSubtitle: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    songsList: {
      flex: 1,
    },
    songsListContent: {
      paddingHorizontal: 16,
      paddingBottom: 100,
    },
    songItemContainer: {
      position: 'relative',
    },
    deleteButton: {
      position: 'absolute',
      right: 16,
      top: 0,
      bottom: 0,
      width: 60,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
    },
    songItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      backgroundColor: theme.colors.background,
      zIndex: 2,
    },
    songCover: {
      width: 48,
      height: 48,
      borderRadius: 4,
      marginRight: 12,
      overflow: 'hidden',
    },
    songCoverImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    songInfo: {
      flex: 1,
    },
    songTitle: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors.text,
      marginBottom: 2,
    },
    songArtist: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
    moreButton: {
      padding: 8,
    },
    modalOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      justifyContent: 'flex-end',
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      height: '80%',
      paddingTop: 16,
    },
    modalHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.colors.text,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.card,
      marginHorizontal: 16,
      marginBottom: 24,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
    },
    searchInput: {
      flex: 1,
      color: theme.colors.text,
      fontSize: 16,
      marginLeft: 8,
    },
    suggestedTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text,
      paddingHorizontal: 16,
      marginBottom: 16,
    },
    suggestedList: {
      flex: 1,
    },
    suggestedSongItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    addButton: {
      padding: 8,
    },
  });

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.loadingText}>Loading playlist...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header */}
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color={theme.colors.text} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{playlistTitle}</Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[styles.headerButton, !canUndo && styles.disabledButton]}
            onPress={handleUndo}
            disabled={!canUndo}
          >
            <Ionicons name="arrow-undo" size={24} color={canUndo ? theme.colors.text : theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.headerButton, !canRedo && styles.disabledButton]}
            onPress={handleRedo}
            disabled={!canRedo}
          >
            <Ionicons name="arrow-redo" size={24} color={canRedo ? theme.colors.text : theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="ellipsis-horizontal" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Playlist Info */}
      <View style={styles.playlistInfo}>
        <View style={styles.playlistCoverLarge}>
          {hasImage && coverImage ? (
            <Image source={coverImage} style={styles.playlistCoverLarge} />
          ) : (
            <>
              <LinearGradient
                colors={coverColor}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
              />
              <Ionicons name={icon} size={60} color={iconColor} />
            </>
          )}
        </View>

        <Text style={styles.playlistTitleLarge}>{playlistTitle}</Text>
        <Text style={styles.playlistSubtitleLarge}>{playlistSubtitle}</Text>
        <Text style={styles.songCount}>{state.songs.length} songs</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.playButton}>
          <Ionicons name="play" size={24} color="#000000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.shuffleButton}>
          <Ionicons name="shuffle" size={20} color={theme.colors.text} />
        </TouchableOpacity>

        <Animated.View style={animatedAddButtonStyle}>
          <TouchableOpacity
            style={styles.addSongButton}
            onPress={() => setShowAddSongs(true)}
          >
            <Ionicons name="add" size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </Animated.View>

        {state.songs.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={handleClearPlaylist}>
            <Ionicons name="trash" size={20} color="#FF3B30" />
          </TouchableOpacity>
        )}
      </View>

      {/* Songs List */}
      {state.songs.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="musical-notes-outline" size={64} color={theme.colors.textSecondary} />
          <Text style={styles.emptyStateTitle}>No songs yet</Text>
          <Text style={styles.emptyStateSubtitle}>Add some songs to get started</Text>
        </View>
      ) : (
        <FlatList
          data={state.songs}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <SongItem song={item} onRemove={handleRemoveSong} index={index} theme={theme} />
          )}
          style={styles.songsList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.songsListContent}
        />
      )}

      {/* Add Songs Modal */}
      {showAddSongs && (
        <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add songs</Text>
              <TouchableOpacity onPress={() => {
                setShowAddSongs(false);
                setSearchQuery('');
              }}>
                <Ionicons name="close" size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color={theme.colors.textSecondary} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search songs"
                placeholderTextColor={theme.colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
            </View>

            <Text style={styles.suggestedTitle}>
              {searchQuery ? 'Search Results' : 'Suggested songs'}
            </Text>

                <FlatList
                  data={filteredSongs}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                    <View style={styles.suggestedSongItem}>
                      <View style={styles.songCover}>
                        <Image source={item.cover} style={styles.songCoverImage} />
                      </View>
                      <View style={styles.songInfo}>
                        <Text style={styles.songTitle} numberOfLines={1}>{item.title}</Text>
                        <Text style={styles.songArtist} numberOfLines={1}>{item.artist}</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => handleAddSong(item)}
                      >
                        <Ionicons name="add-circle-outline" size={24} color={theme.colors.accent} />
                      </TouchableOpacity>
                    </View>
                  )}
                  style={styles.suggestedList}
                  showsVerticalScrollIndicator={false}
                />
          </View>
          </TouchableWithoutFeedback>
        </View>
      )}
    </View>
  );
}