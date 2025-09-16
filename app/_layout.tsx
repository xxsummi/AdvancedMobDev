// import { Stack } from "expo-router";
// import 'react-native-gesture-handler';
//
// export default function RootLayout() {
// //   return <Stack />;
// return <Stack screenOptions={{ headerShown: false }} />;
// }

import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
    </GestureHandlerRootView>
  );
}
