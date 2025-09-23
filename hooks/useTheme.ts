// hooks/useTheme.ts
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Theme } from '../store/themeSlice';

export const useTheme = () => {
  const { currentTheme, themes } = useSelector((state: RootState) => state.theme);

  return {
    theme: themes[currentTheme] as Theme,
    currentThemeId: currentTheme,
    themes,
  };
};