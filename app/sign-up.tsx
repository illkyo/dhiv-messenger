import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import RTLText from '@/components/RTLText';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '@/components/BackButton';
import { supabase } from '@/lib/supabase';

export default function SignUp() {
  
  const [ countryCode, setCountryCode ] = useState('+960');
  const [ phoneNumber, setPhoneNumber ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ otpButtonDisabled, setOtpButtonDisabled ] = useState(true);
  const [ passwordButtonDisabled, setPasswordButtonDisabled ] = useState(true);
  
  async function signUpWithOtp() {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        phone: countryCode + phoneNumber,
        password: '123456',
        options: {
          channel: 'sms'
        }
      });
      if (error) throw error;
      router.push(`enter-otp/${countryCode+phoneNumber}`);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
        console.log(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  async function signUpWithPassword() {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        phone: countryCode + phoneNumber,
        password: password,
      });
      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
        console.log(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (phoneNumber.length === 7) {
      setOtpButtonDisabled(false);
    } else {
      setOtpButtonDisabled(true);
    }
  }, [phoneNumber])

  useEffect(() => {
    if (password.length > 6) {
      setPasswordButtonDisabled(false);
    } else {
      setPasswordButtonDisabled(true);
    }
  }, [password])

  return (
    <SafeAreaView>
      <View className='flex flex-row justify-between p-3'>
        <BackButton />
        <RTLText className='text-3xl font-waheed'>
          ފޯން ނަންބަރު ޖައްސަޥާ
        </RTLText>
      </View>
      <View className='w-full'>
        <TouchableOpacity className='bg-white border border-gray-100 flex-row items-center justify-between p-2'>
          <View className='flex-row items-center gap-2'>
            <Image className='w-[22px] h-[15px]' source={require('@/assets/images/icons/maldivesflag.png')} />
            <Text className='text-lg font-bold'>Maldives</Text>
          </View>
          <Image className='size-4' source={require('@/assets/images/icons/rightarrow.png')} />
        </TouchableOpacity>
        <View className='flex flex-row'>
          <View className='bg-white w-1/4 border border-t-0 border-r-0 border-gray-100 justify-center items-center'>
            <Text className='text-3xl font-opensans-light' style={{ letterSpacing: 1 }}>{countryCode}</Text>
          </View>
          <TextInput 
            className='bg-white border flex-1 border-t-0 border-gray-100 font-opensans-light text-3xl h-14'
            style={{ letterSpacing: 1 }}
            onChangeText={(input) => {
              if ((parseInt(input) || input === '')) {
                setPhoneNumber(input);
              }
            }}
            value={phoneNumber}
            keyboardType='phone-pad'
            maxLength={7}
            selectionColor={'orange'}
            />
        </View>
      </View>
      <RTLText className='text-3xl font-waheed p-3'>
       ޕާސްވޯޑު
      </RTLText>
      <TextInput
        className='bg-white border border-gray-100 font-opensans-light text-3xl h-16'
        onChangeText={(input) => {
          setPassword(input);
        }}
        value={password}
        maxLength={20}
        secureTextEntry
        selectionColor={'orange'}
        />
      <View className='self-center flex items-center gap-6 mt-7'>
        <View className='flex flex-row gap-3'>
          <View className='flex gap-2'>
            <Text className={`font-faruma text-center text-xl ${otpButtonDisabled || loading ? 'text-gray-500' : 'text-primary-300'}`}>
              އޯޓީޕީ
            </Text>
            <TouchableOpacity
              className={`flex justify-center items-center rounded-3xl w-[100px] h-[42px] ${otpButtonDisabled || loading ? 'bg-gray-400' : 'bg-primary-200'}`}
              onPress={() => signUpWithOtp()}
              disabled={otpButtonDisabled || loading}
              >
              <Text className='text-white text-2xl font-waheed'>ކުރިއަށް</Text>
            </TouchableOpacity>
          </View>
          <View className='flex gap-2'>
            <Text className={`font-faruma text-center text-xl ${passwordButtonDisabled || loading ? 'text-gray-500' : 'text-primary-300'}`}>
            ޕާސްވޯޑު
            </Text>
            <TouchableOpacity
              className={`flex justify-center items-center rounded-3xl w-[100px] h-[42px] ${passwordButtonDisabled || loading ? 'bg-gray-400' : 'bg-primary-200'}`}
              onPress={() => signUpWithPassword()}
              disabled={passwordButtonDisabled || loading}
              >
              <Text className='text-white text-2xl font-waheed'>ކުރިއަށް</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text className='font-faruma text-gray-500 w-[178px] h-[42px] text-center'>
          އެސް.އެމް.އެސް ލިބޭ ނަންބަރެއްކަން ކަށަވަރުކުރުމަށް ފަހު ޖަށްސަވާ
        </Text>
      </View>
    </SafeAreaView>
  )};