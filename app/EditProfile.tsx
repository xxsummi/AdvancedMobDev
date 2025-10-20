import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming
} from 'react-native-reanimated';
import { useTheme } from '../hooks/useTheme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Genre options
const GENRES = ['Pop', 'Rock', 'Jazz', 'Classical', 'Hip-Hop', 'R&B', 'Electronic', 'Country'];

// Genre placeholder images
const GENRE_IMAGES = {
  'Pop': 'https://via.placeholder.com/100/FF6B6B/FFFFFF?text=POP',
  'Rock': 'https://via.placeholder.com/100/4ECDC4/FFFFFF?text=ROCK',
  'Jazz': 'https://via.placeholder.com/100/45B7D1/FFFFFF?text=JAZZ',
  'Classical': 'https://via.placeholder.com/100/96CEB4/FFFFFF?text=CLASSICAL',
  'Hip-Hop': 'https://via.placeholder.com/100/FFEAA7/000000?text=HIP-HOP',
  'R&B': 'https://via.placeholder.com/100/DDA0DD/FFFFFF?text=R&B',
  'Electronic': 'https://via.placeholder.com/100/74B9FF/FFFFFF?text=ELECTRONIC',
  'Country': 'https://via.placeholder.com/100/FDCB6E/000000?text=COUNTRY',
};

// Default profile image
const DEFAULT_PROFILE_IMAGE = require('../assets/images/soojin.jpeg');

// Filter types
const FILTERS = {
  none: { name: 'Original', icon: 'camera-outline' },
  grayscale: { name: 'Grayscale', icon: 'contrast-outline' },
  sepia: { name: 'Sepia', icon: 'sunny-outline' },
  vintage: { name: 'Vintage', icon: 'time-outline' },
  cool: { name: 'Cool', icon: 'snow-outline' },
  warm: { name: 'Warm', icon: 'flame-outline' },
};

// Validation requirements component
const ValidationRequirement = React.memo(({ text, isMet, isActive, theme }) => {
  const opacity = useSharedValue(0.5);
  const scale = useSharedValue(1);

  useEffect(() => {
    opacity.value = withTiming(isActive ? 1 : 0.5, { duration: 200 });
    if (isMet && isActive) {
      scale.value = withSequence(
        withTiming(1.1, { duration: 100 }),
        withTiming(1, { duration: 100 })
      );
    }
  }, [isMet, isActive]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }, animatedStyle]}>
      <Ionicons
        name={isMet ? "checkmark-circle" : "radio-button-off"}
        size={16}
        color={isMet ? theme.colors.accent : theme.colors.textSecondary}
      />
      <Text style={[{ fontSize: 12, marginLeft: 8 }, { color: isMet ? theme.colors.accent : theme.colors.textSecondary }]}>
        {text}
      </Text>
    </Animated.View>
  );
});

// Camera Modal Component
const CameraModal = React.memo(({ visible, onClose, onPhotoTaken, theme }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraType, setCameraType] = useState('back');
  const [isPreview, setIsPreview] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [filterIntensity, setFilterIntensity] = useState(1);
  const cameraRef = useRef();

  useEffect(() => {
    if (visible && !permission?.granted) {
      requestPermission();
    }
  }, [visible, permission]);

  const takePicture = async () => {
    if (cameraRef.current) {
      const data = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: true,
        exif: false,
      });
      setPhoto(data);
      setIsPreview(true);
    }
  };

  const processImage = async () => {
    try {
      let processedImage = photo.uri;

      // Apply filters using expo-image-manipulator
      if (selectedFilter !== 'none') {
        const manipulateOptions = [];

        switch (selectedFilter) {
          case 'grayscale':
            // Simulating grayscale by reducing saturation
            break;
          case 'sepia':
            // Simulating sepia tone
            break;
          case 'vintage':
            // Vintage effect
            break;
          case 'cool':
            // Cool tone
            break;
          case 'warm':
            // Warm tone
            break;
        }

        const result = await manipulateAsync(
          processedImage,
          manipulateOptions,
          { compress: 1, format: SaveFormat.JPEG }
        );
        processedImage = result.uri;
      }

      onPhotoTaken({ uri: processedImage });
      resetCamera();
      onClose();
    } catch (error) {
      console.error('Error processing image:', error);
      Alert.alert('Error', 'Failed to process image');
    }
  };

  const resetCamera = () => {
    setIsPreview(false);
    setPhoto(null);
    setSelectedFilter('none');
    setFilterIntensity(1);
  };

  const retakePicture = () => {
    resetCamera();
  };

  const toggleCameraType = () => {
    setCameraType(cameraType === 'back' ? 'front' : 'back');
  };

  if (!permission) {
    return <View />; // still loading permission status
  }

  if (!permission.granted) {
    return (
      <Modal visible={visible} animationType="slide">
        <View style={{ flex: 1, backgroundColor: '#000000' }}>
          <Text style={{ color: '#FFFFFF', fontSize: 18, textAlign: 'center', marginTop: 100 }}>No access to camera</Text>
          <TouchableOpacity style={{ backgroundColor: theme.colors.accent, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 25, alignSelf: 'center', marginTop: 20 }} onPress={requestPermission}>
            <Text style={{ color: '#000000', fontSize: 16, fontWeight: '600' }}>Grant Permission</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 25, alignSelf: 'center', marginTop: 10 }} onPress={onClose}>
            <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1, backgroundColor: '#000000' }}>
        {!isPreview ? (
          <>
            <CameraView
              ref={cameraRef}
              style={{ flex: 1 }}
              facing={cameraType}
            >
              <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'space-between' }}>
                {/* Filter Selection */}
                <ScrollView
                  horizontal
                  style={{ position: 'absolute', top: 60, left: 0, right: 0, height: 80 }}
                  contentContainerStyle={{ paddingHorizontal: 16, alignItems: 'center' }}
                  showsHorizontalScrollIndicator={false}
                >
                  {Object.entries(FILTERS).map(([key, filter]) => (
                    <TouchableOpacity
                      key={key}
                      style={[
                        { backgroundColor: 'rgba(0, 0, 0, 0.6)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, marginHorizontal: 4, alignItems: 'center', minWidth: 60 },
                        selectedFilter === key && { backgroundColor: theme.colors.accent }
                      ]}
                      onPress={() => setSelectedFilter(key)}
                    >
                      <Ionicons
                        name={filter.icon}
                        size={20}
                        color={selectedFilter === key ? '#000' : '#fff'}
                      />
                      <Text style={[
                        { color: '#FFFFFF', fontSize: 10, fontWeight: '500', marginTop: 2 },
                        selectedFilter === key && { color: '#000000' }
                      ]}>
                        {filter.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                {/* Filter Intensity Slider */}
                {selectedFilter !== 'none' && (
                  <View style={{ position: 'absolute', top: 150, left: 16, right: 16, backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: 12, padding: 12 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '500', marginBottom: 8, textAlign: 'center' }}>Intensity</Text>
                    <Slider
                      style={{ height: 30 }}
                      minimumValue={0}
                      maximumValue={1}
                      value={filterIntensity}
                      onValueChange={setFilterIntensity}
                      minimumTrackTintColor={theme.colors.accent}
                      maximumTrackTintColor="rgba(255,255,255,0.3)"
                      thumbStyle={{ backgroundColor: theme.colors.accent }}
                    />
                  </View>
                )}

                {/* Camera Controls */}
                <View style={{ position: 'absolute', bottom: 40, width: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                  <TouchableOpacity style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(0, 0, 0, 0.6)', alignItems: 'center', justifyContent: 'center' }} onPress={onClose}>
                    <Ionicons name="close" size={30} color="#fff" />
                  </TouchableOpacity>

                  <TouchableOpacity style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: 'rgba(255, 255, 255, 0.3)', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#FFFFFF' }} onPress={takePicture}>
                    <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFFFFF' }} />
                  </TouchableOpacity>

                  <TouchableOpacity style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(0, 0, 0, 0.6)', alignItems: 'center', justifyContent: 'center' }} onPress={toggleCameraType}>
                    <Ionicons name="camera-reverse" size={30} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </CameraView>
          </>
        ) : (
          <PhotoPreview
            photo={photo}
            selectedFilter={selectedFilter}
            filterIntensity={filterIntensity}
            onRetake={retakePicture}
            onConfirm={processImage}
            onClose={onClose}
            theme={theme}
          />
        )}
      </View>
    </Modal>
  );
});

// Photo Preview Component with Editing Tools
const PhotoPreview = React.memo(({
  photo,
  selectedFilter,
  filterIntensity,
  onRetake,
  onConfirm,
  onClose,
  theme
}) => {
  const [rotation, setRotation] = useState(0);
  const [cropMode, setCropMode] = useState(false);
  const [cropArea, setCropArea] = useState({
    x: 0,
    y: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
  });

  const rotateImage = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const toggleCropMode = () => {
    setCropMode(!cropMode);
  };

  const applyEdits = async () => {
    try {
      let processedUri = photo.uri;

      // Apply rotation if needed
      if (rotation !== 0) {
        const rotateResult = await manipulateAsync(
          processedUri,
          [{ rotate: rotation }],
          { compress: 1, format: SaveFormat.JPEG }
        );
        processedUri = rotateResult.uri;
      }

      // Apply crop if in crop mode
      if (cropMode) {
        const cropResult = await manipulateAsync(
          processedUri,
          [{
            crop: {
              originX: cropArea.x,
              originY: cropArea.y,
              width: cropArea.width,
              height: cropArea.height,
            }
          }],
          { compress: 1, format: SaveFormat.JPEG }
        );
        processedUri = cropResult.uri;
      }

      onConfirm({ uri: processedUri });
    } catch (error) {
      console.error('Error applying edits:', error);
      Alert.alert('Error', 'Failed to apply edits');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 50, paddingHorizontal: 16, paddingBottom: 16 }}>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: '600', color: '#FFFFFF' }}>Edit Photo</Text>
        <TouchableOpacity onPress={applyEdits}>
          <Ionicons name="checkmark" size={24} color={theme.colors.accent} />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <Image
          source={{ uri: photo.uri }}
          style={[
            { width: SCREEN_WIDTH - 32, height: SCREEN_WIDTH - 32, borderRadius: 16 },
            {
              transform: [{ rotate: `${rotation}deg` }],
            }
          ]}
        />

        {cropMode && (
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: SCREEN_WIDTH - 64, height: SCREEN_WIDTH - 64, borderWidth: 2, borderColor: theme.colors.accent, borderStyle: 'dashed' }} />
          </View>
        )}
      </View>

      <View style={{ paddingVertical: 20 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, alignItems: 'center' }}
        >
          <TouchableOpacity
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 20, marginHorizontal: 8, alignItems: 'center', minWidth: 70 }}
            onPress={rotateImage}
          >
            <Ionicons name="refresh" size={20} color="#fff" />
            <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '500', marginTop: 2 }}>Rotate</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              { backgroundColor: 'rgba(255, 255, 255, 0.1)', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 20, marginHorizontal: 8, alignItems: 'center', minWidth: 70 },
              cropMode && { backgroundColor: theme.colors.accent }
            ]}
            onPress={toggleCropMode}
          >
            <Ionicons name="crop" size={20} color={cropMode ? "#000" : "#fff"} />
            <Text style={[
              { color: '#FFFFFF', fontSize: 12, fontWeight: '500', marginTop: 2 },
              cropMode && { color: '#000000' }
            ]}>
              Crop
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 20, marginHorizontal: 8, alignItems: 'center', minWidth: 70 }} onPress={onRetake}>
            <Ionicons name="camera" size={20} color="#fff" />
            <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '500', marginTop: 2 }}>Retake</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ backgroundColor: theme.colors.accent, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 20, marginHorizontal: 8, alignItems: 'center', minWidth: 80 }} onPress={applyEdits}>
            <Ionicons name="checkmark" size={20} color="#000" />
            <Text style={{ color: '#000000', fontSize: 12, fontWeight: '600', marginTop: 2 }}>Use Photo</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', paddingVertical: 12, paddingHorizontal: 16 }}>
        <Text style={{ color: '#FFFFFF', fontSize: 12, textAlign: 'center' }}>
          Filter: {FILTERS[selectedFilter].name} • Intensity: {Math.round(filterIntensity * 100)}%
        </Text>
      </View>
    </View>
  );
});

// Profile Preview Component
const ProfilePreview = React.memo(({ username, email, genres, profileImage, currentProfile, theme }) => {
  const fadeAnim = useSharedValue(0);

  useEffect(() => {
    fadeAnim.value = withTiming(1, { duration: 300 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
    transform: [
      {
        translateY: interpolate(fadeAnim.value, [0, 1], [20, 0]),
      },
    ],
  }));

  return (
    <Animated.View style={[{ margin: 16, marginBottom: 24 }, animatedStyle]}>
      <Text style={{ fontSize: 18, fontWeight: '600', color: theme.colors.text, marginBottom: 12 }}>Profile Preview</Text>
      <View style={{ backgroundColor: theme.colors.surface, borderRadius: 16, padding: 20, flexDirection: 'row', alignItems: 'center' }}>
        <Image source={profileImage || DEFAULT_PROFILE_IMAGE} style={{ width: 60, height: 60, borderRadius: 30, marginRight: 16 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: theme.colors.text, marginBottom: 4 }}>{username || currentProfile.username || 'Username'}</Text>
          <Text style={{ fontSize: 14, color: theme.colors.textSecondary, marginBottom: 8 }}>{email || currentProfile.email || 'email@example.com'}</Text>
          {(genres.length > 0 || currentProfile.genres.length > 0) && (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
              {(genres.length > 0 ? genres : currentProfile.genres).map((genre, index) => (
                <View key={index} style={{ backgroundColor: theme.colors.accent, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 }}>
                  <Text style={{ color: '#000000', fontSize: 10, fontWeight: '600' }}>{genre}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </Animated.View>
  );
});

export default function EditProfile() {
  const router = useRouter();
  const { theme } = useTheme();

  // Form state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [showGenreList, setShowGenreList] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  
  // Current profile data for placeholders
  const [currentProfile, setCurrentProfile] = useState({
    username: '',
    email: '',
    genres: [],
    profileImage: null,
  });

  // Validation state
  const [usernameErrors, setUsernameErrors] = useState([]);
  const [emailErrors, setEmailErrors] = useState([]);
  const [isUsernameActive, setIsUsernameActive] = useState(false);
  const [isEmailActive, setIsEmailActive] = useState(false);

  // Animation values
  const usernameShake = useSharedValue(0);
  const emailShake = useSharedValue(0);
  const genreShake = useSharedValue(0);

  // Cache keys
  const CACHE_KEY = 'editProfileFormData';
  const PROFILE_DATA_KEY = 'profileData';

  // Load cached data and current profile on mount
  useEffect(() => {
    loadCurrentProfile();
    loadCachedData();
  }, []);

  // Cache data whenever form changes
  useEffect(() => {
    cacheFormData();
  }, [username, email, selectedGenres, profileImage]);

  const loadCurrentProfile = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem(PROFILE_DATA_KEY);
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        setCurrentProfile({
          username: profile.username || 'Summi',
          email: profile.email || '',
          genres: profile.genres || [],
          profileImage: profile.profileImage || null,
        });
      }
    } catch (error) {
      console.error('Failed to load current profile:', error);
    }
  };

  const loadCachedData = async () => {
    try {
      const cachedData = await AsyncStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { username: cachedUsername, email: cachedEmail, genres: cachedGenres, profileImage: cachedImage } = JSON.parse(cachedData);
        setUsername(cachedUsername || '');
        setEmail(cachedEmail || '');
        setSelectedGenres(cachedGenres || []);
        if (cachedImage) {
          setProfileImage({ uri: cachedImage });
        }
      }
    } catch (error) {
      console.error('Failed to load cached data:', error);
    }
  };

  const cacheFormData = async () => {
    try {
      const formData = {
        username,
        email,
        genres: selectedGenres,
        profileImage: profileImage?.uri || null,
      };
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(formData));
    } catch (error) {
      console.error('Failed to cache form data:', error);
    }
  };

  const clearCache = async () => {
    try {
      await AsyncStorage.removeItem(CACHE_KEY);
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  };

  // Enhanced image picker with camera option
  const pickImage = () => {
    Alert.alert(
      'Select Image',
      'Choose how you want to add a profile photo',
      [
        {
          text: 'Camera with Filters',
          onPress: () => setShowCameraModal(true),
        },
        {
          text: 'Photo Library',
          onPress: pickFromLibrary,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const pickFromLibrary = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission required", "Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setProfileImage({ uri: result.assets[0].uri });
    }
  };

  const handleCameraPhoto = (photo) => {
    setProfileImage(photo);
  };

  // Validation functions
  const validateUsername = useCallback((value) => {
    const errors = [];
    if (value.length < 3) errors.push('min3chars');
    if (value.length > 20) errors.push('max20chars');
    if (!/^[a-zA-Z0-9_]+$/.test(value) && value.length > 0) errors.push('alphanumeric');
    return errors;
  }, []);

  const validateEmail = useCallback((value) => {
    const errors = [];
    if (!value.includes('@')) errors.push('requiresAt');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length > 0) errors.push('validFormat');
    return errors;
  }, []);

  // Handle input changes with validation
  const handleUsernameChange = (value) => {
    setUsername(value);
    const errors = validateUsername(value);
    setUsernameErrors(errors);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    const errors = validateEmail(value);
    setEmailErrors(errors);
  };

  // Handle genre selection
  const handleGenreToggle = (genre) => {
    setSelectedGenres(prev => {
      if (prev.includes(genre)) {
        return prev.filter(g => g !== genre);
      } else {
        return [...prev, genre];
      }
    });
  };

  const triggerShake = (shakeValue) => {
    shakeValue.value = withSequence(
      withTiming(-10, { duration: 50 }),
      withTiming(10, { duration: 50 }),
      withTiming(-10, { duration: 50 }),
      withTiming(10, { duration: 50 }),
      withTiming(0, { duration: 50 })
    );
  };

  // Animated styles
  const usernameAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: usernameShake.value }],
  }));

  const emailAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: emailShake.value }],
  }));

  const genreAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: genreShake.value }],
  }));

  // Check if requirement is met
  const isRequirementMet = (field, requirement) => {
    if (field === 'username') {
      switch (requirement) {
        case 'min3chars': return username.length >= 3;
        case 'max20chars': return username.length <= 20;
        case 'alphanumeric': return /^[a-zA-Z0-9_]+$/.test(username) || username.length === 0;
        default: return false;
      }
    } else if (field === 'email') {
      switch (requirement) {
        case 'requiresAt': return email.includes('@');
        case 'validFormat': return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length === 0;
        default: return false;
      }
    }
    return false;
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Use current values if fields are empty
    const finalUsername = username || currentProfile.username;
    const finalEmail = email || currentProfile.email;
    const finalGenres = selectedGenres.length > 0 ? selectedGenres : currentProfile.genres;
    const finalProfileImage = profileImage || (currentProfile.profileImage ? { uri: currentProfile.profileImage } : null);

    const usernameValid = validateUsername(finalUsername).length === 0 && finalUsername.length >= 3;
    const emailValid = validateEmail(finalEmail).length === 0 && finalEmail.length > 0;
    const genreValid = finalGenres.length > 0;

    if (!usernameValid) triggerShake(usernameShake);
    if (!emailValid) triggerShake(emailShake);
    if (!genreValid) triggerShake(genreShake);

    if (usernameValid && emailValid && genreValid) {
      try {
        // Save profile data to AsyncStorage
        const profileData = {
          username: finalUsername,
          email: finalEmail,
          genres: finalGenres,
          profileImage: finalProfileImage?.uri || null,
        };
        await AsyncStorage.setItem(PROFILE_DATA_KEY, JSON.stringify(profileData));

        Alert.alert(
          'Profile Updated!',
          'Your profile has been successfully updated.',
          [
            {
              text: 'OK',
              onPress: async () => {
                await clearCache();
                router.back();
              },
            },
          ]
        );
      } catch (error) {
        console.error('Failed to save profile data:', error);
        Alert.alert('Error', 'Failed to save profile data.');
      }
    } else {
      Alert.alert('Invalid Form', 'Please fix all validation errors before submitting.');
    }
  };

  const handleReset = async () => {
    setUsername('');
    setEmail('');
    setSelectedGenres([]);
    setProfileImage(null);
    setUsernameErrors([]);
    setEmailErrors([]);
    setIsUsernameActive(false);
    setIsEmailActive(false);
    await clearCache();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 50,
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text,
    },
    resetText: {
      color: theme.colors.accent,
      fontSize: 16,
      fontWeight: '500',
    },
    scrollContainer: {
      flex: 1,
    },
    formSection: {
      padding: 16,
    },
    fieldContainer: {
      marginBottom: 24,
    },
    fieldLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 4,
    },
    fieldSubLabel: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      marginBottom: 8,
    },
    imageUploadContainer: {
      alignSelf: 'center',
      marginBottom: 16,
      position: 'relative',
    },
    uploadImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    imageOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageUploadText: {
      color: theme.colors.text,
      fontSize: 10,
      fontWeight: '500',
      marginTop: 4,
    },
    requirementsContainer: {
      marginBottom: 12,
    },
    inputContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      borderWidth: 1,
      paddingHorizontal: 16,
    },
    textInput: {
      fontSize: 16,
      paddingVertical: 16,
    },
    genreSelector: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      borderWidth: 1,
      paddingHorizontal: 16,
      paddingVertical: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    genreText: {
      fontSize: 16,
    },
    selectedGenresContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginTop: 12,
    },
    selectedGenreTag: {
      backgroundColor: theme.colors.accent,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    selectedGenreText: {
      color: '#000000',
      fontSize: 12,
      fontWeight: '600',
    },
    genreList: {
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      marginTop: 8,
      overflow: 'hidden',
    },
    genreOption: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    genreOptionText: {
      fontSize: 16,
    },
    submitButton: {
      backgroundColor: theme.colors.accent,
      borderRadius: 25,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 16,
    },
    submitButtonText: {
      color: '#000000',
      fontSize: 16,
      fontWeight: '600',
    },
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleReset}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Profile Preview */}
        <ProfilePreview
          username={username}
          email={email}
          genres={selectedGenres}
          profileImage={profileImage}
          currentProfile={currentProfile}
          theme={theme}
        />

        {/* Form Section */}
        <View style={styles.formSection}>
          {/* Profile Image Upload */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Profile Image</Text>
            <TouchableOpacity style={styles.imageUploadContainer} onPress={pickImage}>
              <Image
                source={profileImage || DEFAULT_PROFILE_IMAGE}
                style={styles.uploadImage}
              />
              <View style={styles.imageOverlay}>
                <Ionicons name="camera" size={24} color="#FFFFFF" />
                <Text style={styles.imageUploadText}>Change Photo</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Username Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Username</Text>

            {/* Requirements */}
            <View style={styles.requirementsContainer}>
              <ValidationRequirement
                text="3-20 characters"
                isMet={username.length >= 3 && username.length <= 20}
                isActive={isUsernameActive}
                theme={theme}
              />
              <ValidationRequirement
                text="Alphanumeric & underscores only"
                isMet={isRequirementMet('username', 'alphanumeric')}
                isActive={isUsernameActive}
                theme={theme}
              />
            </View>

            <Animated.View style={[
              styles.inputContainer,
              usernameAnimatedStyle,
              {
                borderColor: usernameErrors.length > 0 && username.length > 0 ? '#FF4444' : theme.colors.border,
              }
            ]}>
              <TextInput
                style={[styles.textInput, { color: theme.colors.text }]}
                value={username}
                onChangeText={handleUsernameChange}
                onFocus={() => setIsUsernameActive(true)}
                onBlur={() => setIsUsernameActive(false)}
                placeholder={currentProfile.username || "Enter username"}
                placeholderTextColor={theme.colors.textSecondary}
              />
            </Animated.View>
          </View>

          {/* Email Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Email</Text>

            {/* Requirements */}
            <View style={styles.requirementsContainer}>
              <ValidationRequirement
                text="Must contain @"
                isMet={isRequirementMet('email', 'requiresAt')}
                isActive={isEmailActive}
                theme={theme}
              />
              <ValidationRequirement
                text="Valid email format"
                isMet={isRequirementMet('email', 'validFormat')}
                isActive={isEmailActive}
                theme={theme}
              />
            </View>

            <Animated.View style={[
              styles.inputContainer,
              emailAnimatedStyle,
              {
                borderColor: emailErrors.length > 0 && email.length > 0 ? '#FF4444' : theme.colors.border,
              }
            ]}>
              <TextInput
                style={[styles.textInput, { color: theme.colors.text }]}
                value={email}
                onChangeText={handleEmailChange}
                onFocus={() => setIsEmailActive(true)}
                onBlur={() => setIsEmailActive(false)}
                placeholder={currentProfile.email || "Enter email address"}
                placeholderTextColor={theme.colors.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </Animated.View>
          </View>

          {/* Genres Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Favorite Genres</Text>
            <Text style={styles.fieldSubLabel}>Select multiple genres that you enjoy</Text>

            <Animated.View style={[genreAnimatedStyle]}>
              <TouchableOpacity
                style={[
                  styles.genreSelector,
                  {
                    borderColor: selectedGenres.length === 0 ? theme.colors.border : theme.colors.accent,
                  }
                ]}
                onPress={() => setShowGenreList(!showGenreList)}
              >
                <Text style={[styles.genreText, { color: selectedGenres.length > 0 ? theme.colors.text : theme.colors.textSecondary }]}>
                  {selectedGenres.length > 0 
                    ? `${selectedGenres.length} genre${selectedGenres.length > 1 ? 's' : ''} selected` 
                    : currentProfile.genres.length > 0 
                      ? `Current: ${currentProfile.genres.join(', ')}`
                      : 'Select your favorite genres'
                  }
                </Text>
                <Ionicons
                  name={showGenreList ? "chevron-up" : "chevron-down"}
                  size={20}
                  color={theme.colors.textSecondary}
                />
              </TouchableOpacity>

              {selectedGenres.length > 0 && (
                <View style={styles.selectedGenresContainer}>
                  {selectedGenres.map((genre, index) => (
                    <View key={index} style={styles.selectedGenreTag}>
                      <Text style={styles.selectedGenreText}>{genre}</Text>
                      <TouchableOpacity onPress={() => handleGenreToggle(genre)}>
                        <Ionicons name="close-circle" size={16} color="#000000" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}

              {showGenreList && (
                <View style={styles.genreList}>
                  {GENRES.map((genre) => (
                    <TouchableOpacity
                      key={genre}
                      style={[
                        styles.genreOption,
                        { backgroundColor: selectedGenres.includes(genre) ? theme.colors.accent : 'transparent' }
                      ]}
                      onPress={() => handleGenreToggle(genre)}
                    >
                      <Text style={[
                        styles.genreOptionText,
                        { color: selectedGenres.includes(genre) ? '#000000' : theme.colors.text }
                      ]}>
                        {genre}
                      </Text>
                      {selectedGenres.includes(genre) && (
                        <Ionicons name="checkmark" size={20} color="#000000" />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </Animated.View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Camera Modal */}
      <CameraModal
        visible={showCameraModal}
        onClose={() => setShowCameraModal(false)}
        onPhotoTaken={handleCameraPhoto}
        theme={theme}
      />
    </View>
  );
}