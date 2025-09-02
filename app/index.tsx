import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>𓂃˖˳·˖ ִֶָ ⋆🌷͙⋆ ִֶָ˖·˳˖𓂃{'\n'}Welcome!</Text>

      <Text style={styles.description}>
        This is my welcome page.{'\n'}
        ִֶָ˚⊱🪷⊰˚
      </Text>

      <Button
        title="Continue"
        color="#e82e44"
        onPress={() => router.push('/ComponentShowcase')}
      />
      <Button
              title="Spotify"
              color="#1ED760"
              onPress={() => router.push('/Spotify')}
            />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcdee2',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e82e44',
    marginBottom: 30,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
//     color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 26,
  },
});