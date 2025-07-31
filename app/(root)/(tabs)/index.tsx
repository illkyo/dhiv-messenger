import { Text, View, Alert, TouchableOpacity, Image } from 'react-native';
import { useGlobalContext } from '@/lib/global-provider';
import { Redirect } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Avatar from '@/components/Avatar';

export default function TabOneScreen() {
  const { session, profile } = useGlobalContext()
  const [loading, setLoading] = useState<boolean>(false);

  async function logout() {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut()
      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  if (!profile) return <Redirect href='make-profile' />
  
  return (
    <SafeAreaView className='flex flex-1 items-center border border-red-500'>
      <View className='border border-red-500'>
        <Avatar url={profile.avatar} />
        <TouchableOpacity 
            className={`flex justify-center items-center rounded-3xl w-[100px] h-[42px] ${loading ? 'bg-gray-400' : 'bg-primary-200'}`} 
            onPress={() => logout()} 
            disabled={loading}
        >
          <Text className='text-white text-2xl font-rubik'>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )};
