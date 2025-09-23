import React, { useEffect, ReactNode } from 'react';
import { ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { useTheme } from '../hooks/useTheme';

interface AnimatedContainerProps {
  children: ReactNode;
  style?: ViewStyle;
}

export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  style
}) => {
  const { theme } = useTheme();
  const animationProgress = useSharedValue(0);

  useEffect(() => {
    animationProgress.value = 0;
    animationProgress.value = withTiming(1, { duration: 300 });
  }, [theme]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: theme.colors.background,
      opacity: withTiming(1, { duration: 300 }),
    };
  });

  return (
    <Animated.View style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  );
};