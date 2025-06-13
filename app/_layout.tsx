import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
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

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === 'auth';
    const inOnboardingGroup = segments[0] === 'onboarding';

    if (!isAuthenticated && !inAuthGroup) {
      // Redirect to the login page if not authenticated
      router.replace('/auth/login');
    } else if (isAuthenticated) {
      if (inAuthGroup) {
        // Redirect to the home page if authenticated and trying to access auth pages
        router.replace('/');
      } else if (!user?.onboardComplete && !inOnboardingGroup) {
        // Redirect to onboarding if authenticated but onboarding not complete
        router.replace('/onboarding');
      }
    }
  }, [isAuthenticated, segments, user?.onboardComplete]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="notebook/[id]" options={{ headerShown: true, title: "Notebook" }} />
      <Stack.Screen name="note/[id]" options={{ headerShown: true, title: "Note" }} />
      <Stack.Screen name="create-notebook" options={{ headerShown: true, title: "Create Notebook" }} />
      <Stack.Screen name="create-note" options={{ headerShown: true, title: "Create Note" }} />
      <Stack.Screen name="flashcards" options={{ headerShown: true, title: "Flashcards" }} />
      <Stack.Screen name="quizzes" options={{ headerShown: true, title: "Quizzes" }} />
      <Stack.Screen name="ai-tutor" options={{ headerShown: true, title: "AI Tutor" }} />
      <Stack.Screen name="games" options={{ headerShown: true, title: "Study Games" }} />
      <Stack.Screen name="subscription" options={{ headerShown: true, title: "Subscription Plans" }} />
      <Stack.Screen name="settings/account" options={{ headerShown: true, title: "Account Settings" }} />
      <Stack.Screen name="settings/notifications" options={{ headerShown: true, title: "Notifications" }} />
      <Stack.Screen name="settings/payment" options={{ headerShown: true, title: "Payment Methods" }} />
      <Stack.Screen name="settings/privacy" options={{ headerShown: true, title: "Privacy & Security" }} />
      <Stack.Screen name="help" options={{ headerShown: true, title: "Help & Support" }} />
    </Stack>
  );
}