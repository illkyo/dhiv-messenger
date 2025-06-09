import { View, Text, TouchableOpacity, Alert } from 'react-native';
import RTLText from '@/components/RTLText';
import NumberField from '@/components/NumberField';
import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '@/components/BackButton';
import { supabase } from '@/lib/supabase';

export default function enterOtp() {

  const [enteredOtpArray, setEnteredOtpArray] = useState(['', '', '', '']);
  const [subText, setSubText] = useState('އޯ.ޓީ.ޕީ ފީލްޑުތައް ހުސްކޮށް ނުބާއްވަ. 9-0 ނަންބަރެއް ޖައްސަވާ');
  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ submitButtonDisabled, setsubmitButtonDisabled ] = useState(true);
  const { number } = useLocalSearchParams<{ number: string }>();

  async function submitOtp() {
    try {
      setLoading(true);
      const { error } = await supabase.auth.verifyOtp({ 
        phone: number, 
        token: enteredOtpArray.join(''), 
        type: 'sms'
      })
      if (error) throw error;
      Alert.alert('Success!');
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
        console.log(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  function checkOtpArrayLength(input: string[]) {
    if (input.join('').length === 4) {
      setsubmitButtonDisabled(false);
    } else {
      setsubmitButtonDisabled(true);
  }};

  return (
    <SafeAreaView className='h-full p-3'>
      <BackButton />
      <View className='flex justify-center items-center h-[85%] gap-8'>
        <RTLText className='text-[26px] font-waheed' style={{ letterSpacing: 1 }}>އޯ.ޓީ.ޕީ ޖައްސަވާ</RTLText>
        <NumberField max={4} onNumberEntry={(input, entryIndex) => {
            const newEnteredOtpArray = enteredOtpArray.map((otpVal, otpIndex) => {
              if (entryIndex === otpIndex) {
                return input
              } else {
                return otpVal
            }});
            checkOtpArrayLength(newEnteredOtpArray);
            setEnteredOtpArray(newEnteredOtpArray);
          }}
        />
        <View className="flex gap-4 justify-center items-center">
          <TouchableOpacity
            className={`flex justify-center items-center rounded-3xl w-[75px] h-[40px] ${submitButtonDisabled || loading ? 'bg-gray-400' : 'bg-gray-600'}`}
            onPress={() => {
              submitOtp();
            }}
            disabled={submitButtonDisabled || loading}
            >
            <Text className='text-white text-xl font-waheed'>ސަބްމިޓް</Text>
          </TouchableOpacity>
          <Text className={`font-faruma w-[150px] h-[42px] text-center ${warning ? 'text-primary-100' : 'text-gray-500'}`}>
            {subText}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )}