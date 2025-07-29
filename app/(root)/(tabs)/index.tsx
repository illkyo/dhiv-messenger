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
  const defaultAvatar = supabase.storage.from('avatars').getPublicUrl('default-avatar.jpeg').data.publicUrl;

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
    <SafeAreaView className='flex flex-1 justify-center items-center border border-red-500'>
      <View>
        {/* <TouchableOpacity>
          <Image className='size-20 rounded-full' source={{ uri: defaultAvatar }}></Image>
        </TouchableOpacity>
        <Text className='text-3xl font-faruma'>ފުރަތަމަ ޓެބް</Text> */}
        {/* <Avatar /> */}
      </View>
      <TouchableOpacity 
          className={`flex justify-center items-center rounded-3xl w-[100px] h-[42px] ${loading ? 'bg-gray-400' : 'bg-primary-200'}`} 
          onPress={() => logout()} 
          disabled={loading}
      >
        <Text className='text-white text-2xl font-rubik'>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )};
