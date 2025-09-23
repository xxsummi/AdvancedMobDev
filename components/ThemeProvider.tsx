import React, { useEffect, ReactNode } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { loadTheme } from '../store/themeSlice';
import { View, ActivityIndicator } from 'react-native';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    dispatch(loadTheme());
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#1DB954" />
      </View>
    );
  }

  return <>{children}</>;
};