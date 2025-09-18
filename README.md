# 🎵 Spotify Clone - React Native App

A modern, feature-rich music streaming app built with React Native and Expo, inspired by Spotify's sleek design and user experience.

![App Demo](https://img.shields.io/badge/Platform-iOS%20%7C%20Android-blue)
![React Native](https://img.shields.io/badge/React%20Native-0.72-green)
![Expo](https://img.shields.io/badge/Expo-SDK%2049-purple)
![Status](https://img.shields.io/badge/Status-In%20Development-orange)

## 📱 Features

### Core Features
- **User Authentication**
   - Login screen with email/password
   - Registration with form validation
   - Secure user session management

- **Music Library Management**
   - Personalized playlists view
   - Playlist categorization (Playlists, Podcasts, Albums, Artists, Downloaded)
   - Dynamic playlist covers with gradients and icons
   - Search and filter functionality

- **User Profile**
   - Profile management and customization
   - User preferences and settings
   - Account information display

- **Settings & Privacy**
   - App configuration options
   - Privacy settings
   - Theme and display preferences

### Navigation
- **Stack Navigation** - Clean screen transitions using Expo Router
- **Drawer Navigation** - Side drawer with profile access and quick navigation
- **Bottom Tab Navigation** - Easy access to main app sections (Home, Search, Library, Create)

### UI/UX Features
- **Dark Theme** - Spotify-inspired dark mode design
- **Smooth Animations** - Fluid transitions and micro-interactions
- **Responsive Design** - Optimized for both iOS and Android
- **Custom Components** - Reusable UI components with consistent styling

## 🏗️ Project Structure

```
Summi/
├── app/
│   ├── _layout.tsx              # Root layout with navigation setup
│   ├── index.tsx                # App entry point
│   ├── Login.tsx                # Login screen
│   ├── Registration.tsx         # Registration screen
│   ├── Playlists.tsx           # Main playlists library
│   ├── PlaylistScreen.tsx       # Individual playlist management screen
│   ├── Profile.tsx             # User profile screen
│   └── Settings.tsx            # Settings and privacy
├── assets/
│   └── images/                 # App images and icons
├── components/                 # Reusable UI components
├── constants/                  # App constants and themes
└── package.json               # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/spotify-clone.git
   cd spotify-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your device

## 📦 Dependencies

### Core Dependencies
- **React Native** - Mobile app framework
- **Expo** - Development platform and tools
- **Expo Router** - File-based routing system
- **React** - UI library

### UI & Styling
- **expo-linear-gradient** - Gradient backgrounds
- **@expo/vector-icons** - Icon library
- **react-native-reanimated** - Smooth animations

### Navigation
- **expo-router** - File-based navigation system
- Custom drawer implementation with animations

### Storage (Planned)
- **@react-native-async-storage/async-storage** - Local data persistence

## 🎨 Design System

### Color Palette
- **Primary**: `#1DB954` (Spotify Green)
- **Background**: `#000000` (Deep Black)
- **Surface**: `#1C1C1C` (Dark Gray)
- **Text Primary**: `#FFFFFF` (White)
- **Text Secondary**: `rgba(255, 255, 255, 0.6)` (Muted White)

### Typography
- **Headers**: Bold, 18-22px
- **Body**: Medium, 14-16px
- **Captions**: Regular, 12-14px

### Components
- Custom playlist cards with image/gradient covers
- Animated drawer navigation
- Responsive bottom tab navigation
- Smooth loading states and transitions

## 🔧 Current Implementation

### ✅ Completed Features
- [x] User authentication (Login/Registration)
- [x] Stack navigation with Expo Router
- [x] Drawer navigation with smooth animations
- [x] Playlists library with mock data
- [x] Profile screen
- [x] Settings screen
- [x] Responsive bottom navigation
- [x] Dark theme UI
- [x] Custom playlist covers
- [x] Tab-based playlist filtering

### 🚧 In Development
- [ ] Offline navigation caching with AsyncStorage
- [ ] Real music playback functionality
- [ ] Backend API integration
- [ ] Search functionality
- [ ] Playlist creation and management
- [ ] Music streaming capabilities

### 📋 Planned Features
- [ ] Social features (following, sharing)
- [ ] Music recommendations
- [ ] Offline music downloads
- [ ] Cross-device synchronization
- [ ] Push notifications
- [ ] Analytics and usage tracking

## 🔍 Key Components

### Navigation System
```typescript
// Drawer Navigation
const DrawerOverlay = ({ isVisible, onClose, children }) => {
  // Smooth slide-in/out animations
  // Profile access and quick navigation
}

// Stack Navigation with Expo Router
export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />
}
```

### Playlist Management
```typescript
// Dynamic playlist covers
const PlaylistCover = ({ playlist }) => {
  // Supports both images and gradient backgrounds
  // Icon overlays for system playlists
}
```

## 🛠️ Development

### Available Scripts
```bash
npm start          # Start Expo development server
npm run android    # Run on Android emulator
npm run ios        # Run on iOS simulator
npm run web        # Run on web browser
```

### Code Style
- TypeScript for type safety
- Functional components with hooks
- Consistent styling with StyleSheet
- Component-based architecture

## 📱 Screenshots

*Screenshots will be added as the app development progresses*

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Spotify for design inspiration
- React Native and Expo communities
- Open source contributors

**Note**: This is a educational project created for learning purposes. It is not affiliated with or endorsed by Spotify.

## 📱 Screenshots

## 📱 Screenshots

**Home Screen**  
<img src="assets/images/Index.png" alt="Home Screen" width="300" />

**Component Showcase**  
<img src="assets/images/ComponentShowcase.png" alt="Component Showcase" width="300" />

**Spotify Login**  
<img src="assets/images/SpotifyLogin.png" alt="Spotify Login" width="300" />

**Spotify Registration**  
<img src="assets/images/SpotifyRegistration.png" alt="Spotify Registration" width="300" />

**Spotify Playlists**  
<img src="assets/images/playlists.png" alt="Playlist View" width="300" />

**Spotify Profile**  
<img src="assets/images/profile.png" alt="Profile Screen" width="300" />

**Spotify Settings**  
<img src="assets/images/settings.png" alt="Settings Screen" width="300" />

**Spotify Drawer**  
<img src="assets/images/drawer.png" alt="Drawer View" width="300" />

**Spotify Tablet Playlists**  
<img src="assets/images/TabletPlaylists.png" alt="Tablet Playlist View" width="500" />

**Spotify Tablet Profile**  
<img src="assets/images/TabletProfile.png" alt="Tablet Profile Screen" width="500" />

**Spotify Tablet Settings**  
<img src="assets/images/TabletSettings.png" alt="Tablet Settings Screen" width="500" />

**Spotify Tablet Drawer**  
<img src="assets/images/TabletDrawer.png" alt="Tablet Drawer View" width="500" />




## 📚 Week 4 Activity 1 – Playlist Management with Persistence

In this activity, we implemented a playlist management system where songs can be added, removed, cleared, and restored with undo/redo functionality.

A key feature is data persistence: after adding songs to a playlist and closing the app, when you reopen it, the songs are still there. This is achieved with local storage so that playlists remain intact across sessions.

### 📱 Screenshots



**Playlist Screen**

What appears when you select a playlist in Playlists.tsx.

<img src="assets/images/PlaylistScreen.png" alt="Playlist Screen" width="300" />




**Add Song Popup**

A pop-up that appears when you click on the add button, showing songs you can add. It checks if the song is already in the playlist before adding.

<img src="assets/images/AddSong.png" alt="Add Song Popup" width="300" />




**Clear Playlist Prompt**

A confirmation prompt before completely emptying the playlist.

<img src="assets/images/ClearPlaylistPrompt.png" alt="Clear Playlist Prompt" width="300" />




**Cleared Playlist**

An empty playlist shown after clearing all songs.

<img src="assets/images/ClearedPlaylist.png" alt="Cleared Playlist" width="300" />




**Remove Song**

A sample of removing a song by swiping left on it.

<img src="assets/images/RemoveSong.png" alt="Remove Song" width="300" />




**Undo Action**

Example of undoing a song removal. Here, the song “Back to Friends” by Sombr was restored.

<img src="assets/images/Undo.png" alt="Undo Action" width="300" />




**Redo Action**

Example of redoing the last action after an undo. Here, “Back to Friends” by Sombr was removed again.

<img src="assets/images/Redo.png" alt="Redo Action" width="300" />



---

## 📚 Week 4 Activity 2 – Spotify Profile Creation Form

In this activity, we built a Spotify-inspired profile creation form with **real-time validation, animations, caching, and a dynamic profile preview section**. The form validates inputs instantly, animates on errors, and updates a live preview as the user types or uploads an image.

### 📱 Screenshots



**Old Profile**  
This was my profile before updating. Notice that the favorite genres section is missing.

<img src="assets/images/OldProfile.png" alt="Old Profile" width="300" />



**Edit Profile Form**  
This is the `EditProfile.tsx` screen. It has input validation with red highlights when requirements are not met and green when they are fulfilled. Invalid submissions trigger a **shake animation** on the field. At the top, a **real-time preview section** updates instantly to reflect edits to the username, email, genres, and profile image. An option to upload a profile image is also available.

<img src="assets/images/EditProfile.png" alt="Edit Profile Form" width="300" />



**Edited Profile**  
This shows the profile page after editing. The username, profile image, and favorite genres are updated and displayed correctly.

<img src="assets/images/EditedProfile.png" alt="Edited Profile" width="300" />

### 📝 Validation Logic, Animation, and Preview Update Note
- **Validation Logic**: The form validates inputs in real-time—username (3–20 characters, alphanumeric/underscores), email (valid format with '@' and domain), and genre (must be selected from the predefined list). Errors appear instantly below each field.
- **Animation Approach**: `react-native-reanimated` provides smooth shake animations for invalid inputs and fade-in effects for error messages and the preview section, ensuring smooth UX.
- **Preview Updates**: The profile preview dynamically updates as the user types, displaying username, email, genres, and a genre-specific placeholder image. Updates are optimized using `React.memo` to avoid unnecessary re-renders.  