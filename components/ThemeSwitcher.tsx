// components/ThemeSwitcher.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setTheme, setCustomAccentColor, saveTheme } from '../store/themeSlice';
import { useTheme } from '../hooks/useTheme';
import { ColorPicker } from './ColorPicker';

interface ThemeSwitcherProps {
  visible: boolean;
  onClose: () => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ visible, onClose }) => {
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const { currentTheme, customAccentColor } = useSelector((state: RootState) => state.theme);

  const [showColorPicker, setShowColorPicker] = useState(false);
  const scale = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      scale.value = withSpring(1, { damping: 15 });
    } else {
      scale.value = withTiming(0, { duration: 200 });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleThemeChange = (themeId: string) => {
    dispatch(setTheme(themeId));
    const themeData = {
      currentTheme: themeId,
      customAccentColor,
    };
    dispatch(saveTheme(themeData));
  };

  const handleCustomColorChange = (color: string) => {
    dispatch(setCustomAccentColor(color));
    const themeData = {
      currentTheme,
      customAccentColor: color,
    };
    dispatch(saveTheme(themeData));
    setShowColorPicker(false);
  };

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      padding: 24,
      width: '90%',
      maxHeight: '80%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.25,
      shadowRadius: 20,
      elevation: 10,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 24,
      textAlign: 'center',
    },
    themeOption: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
      paddingHorizontal: 20,
      marginVertical: 6,
      borderRadius: 16,
      backgroundColor: theme.colors.card,
      borderWidth: 2,
      borderColor: 'transparent',
    },
    selectedTheme: {
      borderColor: theme.colors.accent,
      backgroundColor: theme.colors.accent + '20',
    },
    themeInfo: {
      flex: 1,
    },
    themeName: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 4,
    },
    themeDescription: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
    colorPreview: {
      width: 32,
      height: 32,
      borderRadius: 16,
      marginLeft: 12,
      borderWidth: 2,
      borderColor: theme.colors.border,
    },
    customSection: {
      marginTop: 24,
      paddingTop: 20,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    customTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: 16,
    },
    colorPickerButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 14,
      paddingHorizontal: 20,
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    colorPickerText: {
      fontSize: 16,
      color: theme.colors.text,
      fontWeight: '500',
    },
    closeButton: {
      marginTop: 24,
      paddingVertical: 16,
      backgroundColor: theme.colors.accent,
      borderRadius: 12,
      alignItems: 'center',
    },
    closeButtonText: {
      fontSize: 18,
      fontWeight: '600',
      color: '#FFFFFF',
    },
  });

  const themeOptions = [
    {
      id: 'light',
      name: 'Light Theme',
      description: 'Clean and bright interface',
      color: '#1DB954',
    },
    {
      id: 'dark',
      name: 'Dark Theme',
      description: 'Easy on the eyes, perfect for night',
      color: '#1DB954',
    },
    {
      id: 'custom',
      name: 'Custom Theme',
      description: 'Personalize with your favorite colors',
      color: customAccentColor,
    },
  ];

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.overlay}>
        <Animated.View style={[styles.container, animatedStyle]}>
          <Text style={styles.title}>Choose Theme</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            {themeOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.themeOption,
                  currentTheme === option.id && styles.selectedTheme,
                ]}
                onPress={() => handleThemeChange(option.id)}
                activeOpacity={0.7}
              >
                <View style={styles.themeInfo}>
                  <Text style={styles.themeName}>{option.name}</Text>
                  <Text style={styles.themeDescription}>{option.description}</Text>
                </View>
                <View
                  style={[styles.colorPreview, { backgroundColor: option.color }]}
                />
              </TouchableOpacity>
            ))}

            <View style={styles.customSection}>
              <Text style={styles.customTitle}>Customize Accent Color</Text>
              <TouchableOpacity
                style={styles.colorPickerButton}
                onPress={() => setShowColorPicker(true)}
              >
                <Text style={styles.colorPickerText}>Pick Custom Color</Text>
                <View
                  style={[styles.colorPreview, { backgroundColor: customAccentColor }]}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Done</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <ColorPicker
        visible={showColorPicker}
        currentColor={customAccentColor}
        onColorSelect={handleCustomColorChange}
        onClose={() => setShowColorPicker(false)}
      />
    </Modal>
  );
};