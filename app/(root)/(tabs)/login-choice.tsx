import { View, Text, TouchableOpacity } from 'react-native'
import RTLText from '@/components/RTLText';
import { router } from 'expo-router';

export default function Login() {
  return (
    <View className='flex h-full gap-60 p-3'>
      <RTLText className='text-3xl font-waheed' style={{ letterSpacing: 1.5 }}>ލޮގްއިން</RTLText>
      <View className='flex gap-6 self-center'>
        <TouchableOpacity onPress={() => router.push('/otp-login')}>
          <Text className='text-3xl font-waheed text-primary-200' style={{ textAlign: 'right' }}>{'އޯޓީޕީ >>'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/password-login')}>
          <Text className='text-3xl font-waheed text-primary-200' style={{ textAlign: 'right' }}>{'ޕާސްވޯޑް >>'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text className='text-base font-faruma text-blue-500' style={{ textAlign: 'right' }}>އާ އެކައުންޓެއް ހެއްދެވުމަށް</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}