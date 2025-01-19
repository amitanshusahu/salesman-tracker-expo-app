import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useUserStore } from '@/state';
import LoginScreen from '@/screens/LoginScreen';
import { useOnlineManager } from '@/hooks/useOnlineManager';
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getMe } from "@/lib/http/quries";

export default function Start() {
  useOnlineManager();
  const colorScheme = useColorScheme();
  const {setIsLogedIn, isLogedIn} = useUserStore();
  const [login, setLogin] = useState(false);

  const loginQuery = useQuery({
    queryKey: ['tryme'],
    queryFn: getMe,
    enabled: !isLogedIn,
    retry: false,
  })

  useEffect( () => {
    if(loginQuery.isSuccess) {
      console.log(loginQuery.data);
      setIsLogedIn(true);
      setLogin(true);
    }
    if(loginQuery.isError) {
      console.log(loginQuery.error.stack);
    }
    if(loginQuery.isLoading) {
      console.log('loading');
    }
    if(loginQuery.data) {
      console.log(loginQuery.data);
    }
    
  }, [setIsLogedIn, loginQuery.data]);

  return (
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
  )
}