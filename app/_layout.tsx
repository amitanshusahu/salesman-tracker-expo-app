import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import 'react-native-reanimated';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
SplashScreen.preventAutoHideAsync();
import { useUserStore } from '@/state';
import LoginScreen from '@/screens/LoginScreen';
import { useOnlineManager } from '@/hooks/useOnlineManager';

export default function RootLayout() {
  useOnlineManager();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const { isLogedIn } = useUserStore();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 2 } },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {
          isLogedIn ?
            (
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
            ) :
            (
              <LoginScreen />
            )
        }
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
