import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    Alert,
    Modal,
    Dimensions,
    PanResponder,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

// theme + redux imports (same as Settings.tsx)
import { useTheme } from '../hooks/useTheme';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { AnimatedContainer } from '../components/AnimatedContainer';
import { ThemeSwitcher } from '../components/ThemeSwitcher';

const { width, height } = Dimensions.get('window');

// --- Helper Components ---
const ValidationRequirement = ({ isValid, text }: { isValid: boolean; text: string }) => {
    const { theme } = useTheme();
    return (
        <View style={styles.validationRow}>
            <Ionicons
                name={isValid ? 'checkmark-circle' : 'close-circle'}
                size={16}
                color={isValid ? theme.colors.success : theme.colors.error}
                style={styles.validationIcon}
            />
            <Text style={[styles.validationText, { color: theme.colors.text }]}>{text}</Text>
        </View>
    );
};

const CameraModal = ({ visible, onClose, onCapture }: any) => {
    const { theme } = useTheme();
    const cameraRef = useRef<Camera | null>(null);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            onCapture(photo.uri);
        }
    };

    if (hasPermission === null) return <View />;
    if (hasPermission === false) return <Text>No access to camera</Text>;

    return (
        <Modal visible={visible} transparent={false}>
            <Camera style={{ flex: 1 }} type={Camera.Constants.Type.front} ref={cameraRef}>
                <View style={styles.cameraControls}>
                    <TouchableOpacity style={[styles.captureButton, { backgroundColor: theme.colors.primary }]} onPress={takePicture}>
                        <Ionicons name="camera" size={28} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Ionicons name="close" size={32} color="#fff" />
                    </TouchableOpacity>
                </View>
            </Camera>
        </Modal>
    );
};

const PhotoPreview = ({ uri, onClose }: any) => {
    const scale = useSharedValue(1);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                translateX.value = gestureState.dx;
                translateY.value = gestureState.dy;
            },
            onPanResponderRelease: () => {
                translateX.value = withSpring(0);
                translateY.value = withSpring(0);
            },
        })
    ).current;

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }, { translateX: translateX.value }, { translateY: translateY.value }],
    }));

    return (
        <Modal visible={!!uri} transparent>
            <View style={styles.previewContainer}>
                <Animated.Image source={{ uri }} style={[styles.previewImage, animatedStyle]} resizeMode="contain" {...panResponder.panHandlers} />
                <TouchableOpacity style={styles.previewCloseButton} onPress={onClose}>
                    <Ionicons name="close-circle" size={36} color="#fff" />
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const ProfilePreview = ({ profileData, visible, onClose }: any) => {
    const { theme } = useTheme();
    return (
        <Modal visible={visible} transparent>
            <View style={[styles.previewModalContainer, { backgroundColor: theme.colors.background }]}>
                <ScrollView contentContainerStyle={styles.previewContent}>
                    {profileData.image && <Image source={{ uri: profileData.image }} style={styles.previewProfileImage} />}
                    <Text style={[styles.previewName, { color: theme.colors.text }]}>{profileData.name}</Text>
                    <Text style={[styles.previewEmail, { color: theme.colors.textSecondary }]}>{profileData.email}</Text>
                    <Text style={[styles.previewUsername, { color: theme.colors.textSecondary }]}>{profileData.username}</Text>
                    <TouchableOpacity style={[styles.closePreviewButton, { backgroundColor: theme.colors.primary }]} onPress={onClose}>
                        <Text style={styles.closePreviewText}>Close</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </Modal>
    );
};

// --- Main Component ---
export default function EditProfile() {
    const { theme } = useTheme();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const user = useSelector((state: RootState) => state.user);

    const [name, setName] = useState(user?.name || '');
    const [username, setUsername] = useState(user?.username || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(user?.image || '');
    const [modalVisible, setModalVisible] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false);

    const handleImagePick = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 1 });
        if (!result.canceled) setImage(result.assets[0].uri);
    };

    const handleSave = () => {
        if (!name || !username || !email) {
            Alert.alert('Error', 'Please fill all required fields');
            return;
        }
        setPreviewVisible(true);
    };

    return (
        <AnimatedContainer>
            <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Edit Profile</Text>
                <ThemeSwitcher />
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.profileImage} />
                    ) : (
                        <View style={[styles.profilePlaceholder, { backgroundColor: theme.colors.border }]}>
                            <Ionicons name="person" size={64} color={theme.colors.textSecondary} />
                        </View>
                    )}
                </TouchableOpacity>

                <TouchableOpacity style={[styles.uploadButton, { backgroundColor: theme.colors.primary }]} onPress={handleImagePick}>
                    <Text style={styles.uploadButtonText}>Upload Image</Text>
                </TouchableOpacity>

                <TextInput
                    placeholder="Full Name"
                    value={name}
                    onChangeText={setName}
                    style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
                    placeholderTextColor={theme.colors.textSecondary}
                />
                <TextInput
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
                    placeholderTextColor={theme.colors.textSecondary}
                />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
                    placeholderTextColor={theme.colors.textSecondary}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={[styles.input, { borderColor: theme.colors.border, color: theme.colors.text }]}
                    placeholderTextColor={theme.colors.textSecondary}
                />

                <TouchableOpacity style={[styles.saveButton, { backgroundColor: theme.colors.primary }]} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
            </ScrollView>

            <CameraModal visible={modalVisible} onClose={() => setModalVisible(false)} onCapture={(uri: string) => { setImage(uri); setModalVisible(false); }} />
            <ProfilePreview profileData={{ name, username, email, image }} visible={previewVisible} onClose={() => setPreviewVisible(false)} />
        </AnimatedContainer>
    );
}

// --- Styles (moved to bottom) ---
const styles = StyleSheet.create({
    container: { padding: 20 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
    headerTitle: { fontSize: 18, fontWeight: '600' },
    profileImage: { width: 120, height: 120, borderRadius: 60, alignSelf: 'center', marginBottom: 12 },
    profilePlaceholder: { width: 120, height: 120, borderRadius: 60, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
    uploadButton: { padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
    uploadButtonText: { color: '#fff', fontWeight: '600' },
    input: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
    saveButton: { padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 10 },
    saveButtonText: { color: '#fff', fontWeight: '600' },
    validationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
    validationIcon: { marginRight: 8 },
    validationText: { fontSize: 14 },
    cameraControls: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', margin: 20 },
    captureButton: { padding: 16, borderRadius: 50, marginBottom: 20 },
    closeButton: { position: 'absolute', top: 40, right: 20 },
    previewContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center' },
    previewImage: { width: width, height: height * 0.7 },
    previewCloseButton: { position: 'absolute', top: 40, right: 20 },
    previewModalContainer: { flex: 1, justifyContent: 'center' },
    previewContent: { alignItems: 'center', padding: 20 },
    previewProfileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 12 },
    previewName: { fontSize: 20, fontWeight: '600', marginBottom: 4 },
    previewEmail: { fontSize: 16, marginBottom: 4 },
    previewUsername: { fontSize: 16, marginBottom: 12 },
    closePreviewButton: { padding: 12, borderRadius: 8, marginTop: 10 },
    closePreviewText: { color: '#fff', fontWeight: '600' },
});
