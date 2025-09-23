// import { Stack } from "expo-router";
// import 'react-native-gesture-handler';
//
// export default function RootLayout() {
// //   return <Stack />;
// return <Stack screenOptions={{ headerShown: false }} />;
// }

// import { Stack } from "expo-router";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
//
// export default function RootLayout() {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <Stack screenOptions={{ headerShown: false }} />
//     </GestureHandlerRootView>
//   );
// }
import React from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { ThemeProvider } from '../components/ThemeProvider';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../hooks/useTheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const RootLayoutContent = () => {
  const { theme } = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: theme.colors.surface }}>
        <StatusBar style={theme.colors.background === '#FFFFFF' ? 'dark' : 'light'} />
        <Stack
          screenOptions={{
            headerShown: false, // 👈 hide all headers globally
            headerStyle: {
              backgroundColor: theme.colors.surface,
            },
            headerTintColor: theme.colors.text,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="Spotify" />
          <Stack.Screen name="SpotifyRegistration" />
          <Stack.Screen name="Playlists" />
          <Stack.Screen name="PlaylistScreen" />
          <Stack.Screen name="Profile" />
          <Stack.Screen name="Settings" />
          <Stack.Screen name="EditProfile" />
        </Stack>
      </View>
    </GestureHandlerRootView>
  );
};

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <RootLayoutContent />
      </ThemeProvider>
    </Provider>
  );
}
