import { View, Text, TextInput } from 'react-native';
import RTLText from './RTLText';

export default function DhivehiFormField({title, value, required = false, onFieldEntry}: { title: string; value: string; required?: boolean; onFieldEntry: (entry: string) => void }) {
  return (
    <View className='flex gap-1'>
      { required ?
        <View className='flex-row-reverse gap-2'>
          <RTLText className='text-gray-500 font-waheed text-2xl'>{title}</RTLText>
          <Text className='font-faruma text-primary-300 text-2xl'>*</Text>
        </View> :
        <RTLText className='text-gray-500 font-waheed text-2xl'>{title}</RTLText>
      }
      <TextInput 
        className='p-0 pr-2 font-faruma text-xl' 
        onChangeText={(input) => {
          onFieldEntry(input);
        }}
        value={value}
      />
      <View className='border-[0.25px] border-gray-400'>
      </View>
    </View>
  )}