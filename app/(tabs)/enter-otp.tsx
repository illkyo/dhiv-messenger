import { View, Text, TouchableOpacity, Alert } from 'react-native';
import RTLText from '@/components/RTLText';
import NumberField from '@/components/NumberField';
import { useState } from 'react';

const testOtp = '4545' // for testing

export default function enterOtp() {

  const [enteredOtpArray, setEnteredOtpArray] = useState(['', '', '', '']);
  const [warning, setWarning] = useState(false);
  const [subText, setSubText] = useState('އޯ.ޓީ.ޕީ ފީލްޑުތައް ހުސްކޮށް ނުބާއްވަ. 9-0 ނަންބަރެއް ޖައްސަވާ');

  return (
    <View className='flex justify-center items-center h-[85%] gap-8'>
      <RTLText className='text-[26px] font-waheed' style={{ letterSpacing: 3 }}>އޯ.ޓީ.ޕީ ޖައްސަވާ</RTLText>
      <NumberField max={4} onNumberEntry={(input, entryIndex) => {
          const newEnteredOtpArray = enteredOtpArray.map((otpVal, otpIndex) => {
            if (entryIndex === otpIndex) {
              return input
            } else {
              return otpVal
            }});
          setEnteredOtpArray(newEnteredOtpArray);
        }}
      />
      <View className="flex gap-4 justify-center items-center">
        <TouchableOpacity
          className='flex justify-center items-center rounded-3xl bg-gray-700 w-[75px] h-[40px]'
          onPress={() => {
            if (enteredOtpArray.every((otpEntry) => otpEntry !== '')) {
              if (enteredOtpArray.join('') === testOtp) {
                setSubText('Entered correct OTP!');
              } else {
                setSubText('އޯ.ޓީ.ޕީ ރަނގަޅަށް ޖައްސަވާ');
              }
              setWarning(true);
            } else {
              setWarning(true);
            }
          }}
          >
          <Text className='text-white text-xl font-waheed'>ސަބްމިޓް</Text>
        </TouchableOpacity>
        <Text className={`font-faruma w-[150px] h-[42px] text-center ${warning ? 'text-primary-100' : 'text-gray-500'}`}>
          {subText}
        </Text>
      </View>
    </View>
  )}