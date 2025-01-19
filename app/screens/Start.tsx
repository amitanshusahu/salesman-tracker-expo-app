import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useUserStore } from '@/state';
import { useOnlineManager } from '@/hooks/useOnlineManager';
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getMe } from "@/lib/http/quries";
import { SafeAreaView } from 'react-native';
import LoginAndSignup from './LoginAndSignup';

export default function Start() {
  useOnlineManager();
  const colorScheme = useColorScheme();
  const { setIsLogedIn, isLogedIn } = useUserStore();

  // const loginQuery = useQuery({
  //   queryKey: ['tryme'],
  //   queryFn: getMe,
  //   enabled: !isLogedIn,
  //   retry: false,
  // })

  // useEffect(() => {
  //   if (loginQuery.isSuccess) {
  //     console.log(loginQuery.data);
  //     setIsLogedIn(true);
  //   }
  //   if (loginQuery.isError) {
  //     console.log(loginQuery.error.stack);
  //   }
  //   if (loginQuery.isLoading) {
  //     console.log('loading');
  //   }
  //   if (loginQuery.data) {
  //     console.log(loginQuery.data);
  //   }

  // }, [setIsLogedIn, loginQuery.data]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={{ height: '100%'}}>
      <StatusBar style="auto" animated={true}/>
      {
        isLogedIn ?
          (
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          ) :
          (
            <LoginAndSignup />
          )
      }
      </SafeAreaView>
    </ThemeProvider>
  )
}