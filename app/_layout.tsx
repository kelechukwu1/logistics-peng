import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useStore } from '@/store/useStore';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import '../global.css';

export default function RootLayout() {
  const { loadSettings } = useStore();

  useFrameworkReady();

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}