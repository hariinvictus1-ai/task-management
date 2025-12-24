import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import queryClientFn from "./query/queryClient";

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';

import { Text } from 'react-native';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    InterRegular: Inter_400Regular,
    InterMedium: Inter_500Medium,
    InterSemiBold: Inter_600SemiBold,
    InterBold: Inter_700Bold,
  });

  if (!fontsLoaded) return <Text />;

  return (
    <QueryClientProvider client={queryClientFn}>
      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>
  );
}
