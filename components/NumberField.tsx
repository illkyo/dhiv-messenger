import { View, TouchableOpacity, TextInput } from 'react-native';
import { useRef } from 'react';

export default function NumberField({ max, onNumberEntry }: { max: number; onNumberEntry: (value: string, index: number) => void; }) {
  
  const textInputRefs = useRef<(TextInput | null)[]>([]);
  
  return (
    <View className='flex-row gap-4'>
      {Array.from({ length: max }).map((_, i) => (
        <TouchableOpacity key={i} className='rounded-xl bg-[#D9D9D9] opacity-50 size-[44px] flex items-center justify-center' style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 4, // Android-specific
        }} onPress={() => textInputRefs.current[i]?.focus()}>
          <TextInput
            ref={(el) => {textInputRefs.current[i] = el}}
            className='font-opensans text-3xl flex items-center justify-center -mt-1' 
            maxLength={1}
            autoComplete='sms-otp'
            onChangeText={(input) => {
              if (parseInt(input) || input === '') {
                onNumberEntry(input, i);
              }
            }}
            keyboardType='phone-pad'
            selectionColor={'orange'}
          />
        </TouchableOpacity>
      ))}
    </View>
  )}