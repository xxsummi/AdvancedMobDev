// app/MapScreen.tsx
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export default function MapScreen() {
  const [location, setLocation] = useState<any>(null);

  // Get user location
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required.');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  // Geofencing simulation
  useEffect(() => {
    let watcher: any;
    if (location) {
      (async () => {
        watcher = await Location.watchPositionAsync(
          { accuracy: Location.Accuracy.High, distanceInterval: 5 },
          (loc) => {
            const { latitude, longitude } = loc.coords;

            const distance = (lat1: number, lon1: number, lat2: number, lon2: number) =>
              Math.sqrt((lat1 - lat2) ** 2 + (lon1 - lon2) ** 2) * 111000; // approx meters

            if (distance(latitude, longitude, location.latitude + 0.001, location.longitude + 0.001) < 100) {
              Alert.alert('Geofence Alert', 'Entered POI 1 area!');
            }
          }
        );
      })();
    }
    return () => watcher && watcher.remove();
  }, [location]);

  if (!location) return <View style={styles.container} />;

  // Dark map style
  const mapStyle = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        zoomEnabled
        scrollEnabled
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        customMapStyle={mapStyle}
      >
        {/* Mock Points of Interest */}
        <Marker
          coordinate={{ latitude: location.latitude + 0.001, longitude: location.longitude + 0.001 }}
          title="POI 1"
          description="Mock landmark 1"
        />
        <Marker
          coordinate={{ latitude: location.latitude - 0.001, longitude: location.longitude - 0.001 }}
          title="POI 2"
          description="Mock landmark 2"
        />
        <Marker
          coordinate={{ latitude: location.latitude + 0.001, longitude: location.longitude - 0.001 }}
          title="POI 3"
          description="Mock landmark 3"
        />

        {/* Geofence circle */}
        <Circle
          center={{ latitude: location.latitude + 0.001, longitude: location.longitude + 0.001 }}
          radius={100}
          fillColor="rgba(255,0,0,0.2)"
          strokeColor="rgba(255,0,0,0.5)"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
