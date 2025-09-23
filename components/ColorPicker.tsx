import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';

const presetColors = [
  '#FF6B35', '#F7931E', '#FFD23F', '#06FFA5', '#118AB2',
  '#073B4C', '#8E44AD', '#E74C3C', '#2ECC71', '#F39C12',
  '#9B59B6', '#1ABC9C', '#34495E', '#E67E22', '#95A5A6',
  '#FF1744', '#FF9100', '#00BCD4', '#4CAF50', '#FFC107',
];

interface ColorPickerProps {
  visible: boolean;
  currentColor: string;
  onColorSelect: (color: string) => void;
  onClose: () => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  visible,
  currentColor,
  onColorSelect,
  onClose
}) => {
  const { theme } = useTheme();
  const [selectedColor, setSelectedColor] = useState(currentColor);

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
      maxHeight: '70%',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 20,
      textAlign: 'center',
    },
    colorGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    colorOption: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginBottom: 12,
      borderWidth: 3,
      borderColor: 'transparent',
    },
    selectedColor: {
      borderColor: theme.colors.text,
      transform: [{ scale: 1.1 }],
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: 'center',
      marginHorizontal: 8,
    },
    cancelButton: {
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    selectButton: {
      backgroundColor: theme.colors.accent,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
    },
    cancelButtonText: {
      color: theme.colors.text,
    },
    selectButtonText: {
      color: '#FFFFFF',
    },
  });

  const handleSelect = () => {
    onColorSelect(selectedColor);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Choose Accent Color</Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.colorGrid}>
              {presetColors.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    selectedColor === color && styles.selectedColor,
                  ]}
                  onPress={() => setSelectedColor(color)}
                  activeOpacity={0.8}
                />
              ))}
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.selectButton]} onPress={handleSelect}>
              <Text style={[styles.buttonText, styles.selectButtonText]}>Select</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
