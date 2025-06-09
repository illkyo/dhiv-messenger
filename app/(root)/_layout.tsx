import { useState } from 'react';
import { Slot, Redirect } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native";
import { Alert } from 'react-native';
import { useGlobalContext } from '@/lib/global-provider';

export default function App() {
  const { session } = useGlobalContext();

  if (!session?.user) return <Redirect href='/login-choice' />

  return <Slot />

}