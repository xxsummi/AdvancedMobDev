import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppThunk } from './store';

const THEME_STORAGE_KEY = '@summi_theme';

export interface ThemeColors {
  primary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  accent: string;
  card: string;
  border: string;
  success: string;
  warning: string;
  error: string;
}

export interface Theme {
  id: string;
  name: string;
  colors: ThemeColors;
}

interface ThemeState {
  currentTheme: string;
  themes: Record<string, Theme>;
  customAccentColor: string;
  isLoading: boolean;
}

const themes: Record<string, Theme> = {
  light: {
    id: 'light',
    name: 'Light',
    colors: {
      primary: '#1DB954',
      background: '#FFFFFF',
      surface: '#F8F9FA',
      text: '#000000',
      textSecondary: '#666666',
      accent: '#1DB954',
      card: '#FFFFFF',
      border: '#E9ECEF',
      success: '#28A745',
      warning: '#FFC107',
      error: '#DC3545',
    }
  },
  dark: {
    id: 'dark',
    name: 'Dark',
    colors: {
      primary: '#1DB954',
      background: '#121212',
      surface: '#181818',
      text: '#FFFFFF',
      textSecondary: '#B3B3B3',
      accent: '#1DB954',
      card: '#282828',
      border: '#404040',
      success: '#28A745',
      warning: '#FFC107',
      error: '#DC3545',
    }
  },
  custom: {
    id: 'custom',
    name: 'Custom',
    colors: {
      primary: '#FF6B35',
      background: '#0A0A0A',
      surface: '#1A1A1A',
      text: '#FFFFFF',
      textSecondary: '#CCCCCC',
      accent: '#FF6B35',
      card: '#2A2A2A',
      border: '#555555',
      success: '#28A745',
      warning: '#FFC107',
      error: '#DC3545',
    }
  }
};

const initialState: ThemeState = {
  currentTheme: 'dark',
  themes,
  customAccentColor: '#FF6B35',
  isLoading: true,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.currentTheme = action.payload;
      if (action.payload === 'custom') {
        state.themes.custom.colors.accent = state.customAccentColor;
        state.themes.custom.colors.primary = state.customAccentColor;
      }
    },
    setCustomAccentColor: (state, action: PayloadAction<string>) => {
      state.customAccentColor = action.payload;
      state.themes.custom.colors.accent = action.payload;
      state.themes.custom.colors.primary = action.payload;
    },
    setThemeData: (state, action: PayloadAction<{ currentTheme: string; customAccentColor: string }>) => {
      state.currentTheme = action.payload.currentTheme;
      state.customAccentColor = action.payload.customAccentColor;
      state.themes.custom.colors.accent = action.payload.customAccentColor;
      state.themes.custom.colors.primary = action.payload.customAccentColor;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  },
});

export const { setTheme, setCustomAccentColor, setThemeData, setLoading } = themeSlice.actions;

// Async thunks
export const loadTheme = (): AppThunk => async (dispatch) => {
  try {
    const themeData = await AsyncStorage.getItem(THEME_STORAGE_KEY);
    if (themeData) {
      const parsedData = JSON.parse(themeData);
      dispatch(setThemeData(parsedData));
    } else {
      dispatch(setLoading(false));
    }
  } catch (error) {
    console.error('Error loading theme:', error);
    dispatch(setLoading(false));
  }
};

export const saveTheme = (themeData: { currentTheme: string; customAccentColor: string }): AppThunk =>
  async (dispatch) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(themeData));
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

export default themeSlice.reducer;

