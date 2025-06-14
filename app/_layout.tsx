import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import './global.css';
import GlobalProvider from "@/lib/global-provider";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Faruma': require('@/assets/fonts/Faruma.ttf'),
    'Kanafala': require('@/assets/fonts/Kanafala.ttf'),
    'Rubik-Regular': require('@/assets/fonts/Rubik-Regular.ttf'), // test font
    'Waheed': require('@/assets/fonts/MVWaheed.otf'),
    'OpenSans-Light': require('@/assets/fonts/OpenSans-Light.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GlobalProvider>
      <Stack screenOptions={{ headerShown: false, statusBarHidden: false, statusBarStyle: 'dark' }} />
    </GlobalProvider>
  )
};