import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';

const EXPO_CLERK_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    regular: require('../assets/fonts/Lato-Regular.ttf'),
    bold: require('../assets/fonts/Lato-Bold.ttf'),
    black: require('../assets/fonts/Lato-Black.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const router = useRouter();

  const tokenCache = {
    async getToken(key: string) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (err) {
        return null;
      }
    },
    async saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return null;
      }
    },
  };

  return (
    <ClerkProvider publishableKey={EXPO_CLERK_KEY!} tokenCache={tokenCache}>
      <ClerkAuth router={router} />
    </ClerkProvider>
  );
}

function ClerkAuth({ router }:any) {
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/(modals)/login');

      console.log('is is signed in ', isSignedIn )
    }
  }, [isLoaded]);

  const { width } = Dimensions.get('window');

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/login"
        options={{
          presentation: 'modal',
          title: 'login or sign up',
          headerTitleStyle: {
            fontFamily: 'bold',
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.dismiss()}
              style={{ marginRight: width * 0.25 }}
            >
              <Ionicons name="close-outline" size={20} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="(listing)/[id ]" options={{ title: ' ', headerTitle: '  ' }} />
      <Stack.Screen
        name="(modals)/booking"
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.dismiss()}
              style={{ marginRight: width * 0.25 }}
            >
              <Ionicons name="close-outline" size={20} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
  