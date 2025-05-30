import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import { useState } from 'react';
import { router } from 'expo-router';
import RTLText from '@/components/RTLText';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '@/components/BackButton';

export default function OTPLogin() {

  const [ phoneNumber, setPhoneNumber ] = useState('');

  return (
    <SafeAreaView className='flex h-full gap-48'>
      <View className='flex flex-row justify-between p-3'>
        <BackButton />
        <RTLText className='text-3xl font-waheed' style={{ letterSpacing: 1 }}>
          އޯޓީޕީ ލޮގިން
        </RTLText>
      </View>
      <View className='w-[80%] self-center flex gap-6'>
        <View>
          <Text className='font-waheed text-gray-500 ml-3 text-2xl'>ފޯން ނަމްބަރު</Text>
          <TouchableOpacity className='bg-white border rounded-t-2xl border-gray-100 flex-row items-center justify-between p-3'>
            <View className='flex-row items-center gap-2'>
              <Image className='w-[22px] h-[15px]' source={require('@/assets/images/icons/maldivesflag.png')} />
              <Text className='text-lg font-bold'>Maldives</Text>
            </View>
            <Image className='size-4' source={require('@/assets/images/icons/rightarrow.png')} />
          </TouchableOpacity>
          <View className='flex flex-row'>
            <View className='bg-white w-1/4 border rounded-bl-2xl border-t-0 border-r-0 border-gray-100 justify-center items-center'>
              <Text className='text-2xl font-opensans-light' style={{ letterSpacing: 1 }}>+960</Text>
            </View>
            <TextInput
              className='bg-white border flex-1 border-t-0 rounded-br-2xl border-gray-100 font-opensans-light text-2xl'
              style={{ letterSpacing: 1 }}
              onChangeText={(input) => {
                if ((parseInt(input) || input === '')) {
                  setPhoneNumber(input);
                }
              }}
              value={phoneNumber}
              keyboardType= 'phone-pad'
              maxLength={7}
              />
          </View>
        </View>
        <TouchableOpacity className='flex justify-center items-center rounded-3xl bg-primary-100 w-[90] h-[42px] self-end' onPress={() => router.push('/enter-otp')}>
          <RTLText className='text-white text-2xl font-waheed' style={{ letterSpacing: 0.8 }}>ކުރިއަށް</RTLText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )}