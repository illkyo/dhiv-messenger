import { View, Text, TouchableOpacity } from 'react-native'
import RTLText from '@/components/RTLText';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '@/lib/global-provider';

export default function Login() {
  const { profile } = useGlobalContext()
  return (
    <SafeAreaView className='flex h-full gap-60 p-3'>
      <RTLText className='text-3xl font-waheed' style={{ letterSpacing: 1.5 }}>ލޮގްއިން</RTLText>
      <View className='flex gap-6 self-center'>
        <TouchableOpacity onPress={() => router.push('/otp-login')}>
          <Text className='text-3xl font-waheed text-primary-200' style={{ textAlign: 'right' }}>{'އޯޓީޕީ >>'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/password-login')}>
          <Text className='text-3xl font-waheed text-primary-200' style={{ textAlign: 'right' }}>{'ޕާސްވޯޑް >>'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/sign-up')}>
          <Text className='text-base font-faruma text-blue-500' style={{ textAlign: 'right' }}>އާ އެކައުންޓެއް ހެއްދެވުމަށް</Text>
        </TouchableOpacity>
      </View>
      <Text>
        {profile?.id}
      </Text>
    </SafeAreaView>
  )};