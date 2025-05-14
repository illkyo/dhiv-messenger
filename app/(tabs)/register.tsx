import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import { useState } from 'react';
import RTLText from '@/components/RTLText';

export default function Register() {
  const [ phoneNumber, setPhoneNumber ] = useState('');

  return (
    <View>
      <RTLText className='text-3xl font-waheed p-3' style={{ letterSpacing: 2 }}>
        ފޯން ނަންބަރު ޖައްސަޥާ
      </RTLText>
      <View className='w-full'>
        <TouchableOpacity className='bg-white border border-gray-100 flex-row items-center justify-between p-2'>
          <View className='flex-row items-center gap-2'>
            <Image className='w-[22px] h-[15px]' source={require('@/assets/images/icons/maldivesflag.png')} />
            <Text className='text-lg font-bold'>Maldives</Text>
          </View>
          <Image className='size-4' source={require('@/assets/images/icons/rightarrow.png')} />
        </TouchableOpacity>
        <View className='flex flex-row'>
          <View className='bg-white w-1/4 border border-t-0 border-gray-100 justify-center items-center'>
            <Text className='text-3xl font-opensans-light' style={{ letterSpacing: 1 }}>+960</Text>
          </View>
          <TextInput 
            className='bg-white border flex-1 border-t-0 border-gray-100 font-opensans-light text-3xl'
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
      <View className='self-center flex items-center gap-6 mt-7'>
        <TouchableOpacity className='flex justify-center items-center rounded-3xl bg-primary-200 w-[100px] h-[42px]'>
            <Text className='text-white text-2xl font-waheed'>ކުރިއަށް</Text>
        </TouchableOpacity>
        <Text className='font-faruma text-gray-500 w-[178px] h-[42px] text-center'>
        އެސް.އެމް.އެސް ލިބޭ ނަންބަރެއްކަން ކަށަވަރުކުރުމަށް ފަހު ޖަށްސަވާ
        </Text>
      </View>
    </View>
  )}