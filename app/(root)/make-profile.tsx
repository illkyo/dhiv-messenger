import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import RTLText from '@/components/RTLText';
import { useState } from 'react';
import DhivehiFormField from '@/components/DhivehiFormField';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MakeProfile() {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView className='flex gap-8 p-8'>
      <View className='flex justify-center items-center gap-2'>
        <View className='flex justify-center items-center gap-1'>
          <RTLText className='font-waheed text-3xl w-[60px]'>ޕްރޮފައިލް</RTLText>
          <Text className='font-faruma text-base text-gray-500'>ފީލްޑުތައް ފުރުއްވާ</Text>
        </View>
        <View>
          <TouchableOpacity className='bg-[#D9D9D9] size-20 rounded-full flex justify-center items-center relative'>
            <FontAwesome size={30} name='camera' color='white'/>
            <TouchableOpacity className='bg-primary-200 size-[22px] rounded-full flex justify-center items-center absolute bottom-0 right-0'>
              <FontAwesome size={10} name='plus' color='white'/>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
      <View className='flex gap-5'>
        <DhivehiFormField title='ނަން' value={name} required={true} onFieldEntry={(input) => {
          console.log(input);
          setName(input);
          }}/>
        <DhivehiFormField title='ޕާސްވޯޑް' value={password} required={true} onFieldEntry={(input) => setPassword(input)}/>
        <DhivehiFormField title='އީމެއިލް' value={email} onFieldEntry={(input) => setEmail(input)}/>
      </View>
    </SafeAreaView>
  )}