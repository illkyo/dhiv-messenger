import { Text, View, Alert, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { useGlobalContext } from '@/lib/global-provider';
import { Redirect } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';

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

  // if (!profile) return <Redirect href='make-profile' />
  
  return (
    <View className='flex flex-1 justify-center items-center bg-red'>
      <Text className='text-3xl font-faruma'>ފުރަތަމަ ޓެބް</Text>
      <Text>{session?.user.id}</Text>
      <TouchableOpacity 
          className={`flex justify-center items-center rounded-3xl w-[100px] h-[42px] ${loading ? 'bg-gray-400' : 'bg-primary-200'}`} 
          onPress={() => logout()} 
          disabled={loading}
      >
        <Text className='text-white text-2xl font-rubik'>Logout</Text>
      </TouchableOpacity>
    </View>
  )};
