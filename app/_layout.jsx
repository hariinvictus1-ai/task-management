import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Redirect, Stack } from 'expo-router';
import { AuthProvider } from "./(auth)/authContext";


import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';

import { ThemeProvider } from "./src/theme/ThemeContext";

import { useEffect } from 'react';
import { Text } from 'react-native';

export default function RootLayout() {


  const [fontsLoaded] = useFonts({
    InterRegular: Inter_400Regular,
    InterMedium: Inter_500Medium,
    InterSemiBold: Inter_600SemiBold,
    InterBold: Inter_700Bold,
  });

  useEffect(() => {
    <Redirect href="/login" />
  }, [])


  if (!fontsLoaded) return <Text />;
  if (!fontsLoaded) return <Text />;
  const queryClient = new QueryClient();

  return (
    <AuthProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Stack screenOptions={{ headerShown: false }} />
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
