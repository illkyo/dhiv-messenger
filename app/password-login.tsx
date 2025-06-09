import { View, Text, Image, TextInput, TouchableOpacity, Alert} from 'react-native'
import { useState, useEffect } from 'react';
import RTLText from '@/components/RTLText';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '@/components/BackButton';
import { supabase } from '@/lib/supabase';

export default function PasswordLogin() {

  const [ countryCode, setCountryCode ] = useState('+960');
  const [ phoneNumber, setPhoneNumber ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loginButtonDisabled, setLoginButtonDisabled ] = useState(true);
  const [ loading, setLoading ] = useState(false);

  async function login() {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({  
        phone: countryCode + phoneNumber,
        password: password
      })
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
    if (phoneNumber.length === 7 && password.length > 6) {
      setLoginButtonDisabled(false);
    } else {
      setLoginButtonDisabled(true);
    }
  }, [phoneNumber, password]);

  return (
    <SafeAreaView className='flex h-full gap-48'>
      <View className='flex flex-row justify-between p-3'>
        <BackButton />
        <RTLText className='text-3xl font-waheed' style={{ letterSpacing: 1 }}>
          ޕާސްވޯޑް ލޮގިން
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
              <Text className='text-2xl font-opensans-light' style={{ letterSpacing: 1 }}>{countryCode}</Text>
            </View>
            <TextInput
              className='bg-white border flex-1 border-t-0 rounded-br-2xl border-gray-100 font-opensans-light text-2xl h-14'
              style={{ letterSpacing: 1 }}
              onChangeText={(input) => {
                if ((parseInt(input) || input === '')) {
                  setPhoneNumber(input);
                }
              }}
              value={phoneNumber}
              keyboardType= 'phone-pad'
              maxLength={7}
              selectionColor={'orange'}
              />
          </View>
        </View>
        <View>
          <Text className='font-waheed text-gray-500 ml-3 text-2xl'>ޕާސްވޯޑް</Text>
          <View className='bg-white border rounded-2xl border-gray-100 pl-2 h-14'>
            <TextInput
              className='text-2xl'
              onChangeText={(i) => {
                setPassword(i)
              }}
              value={password}
              secureTextEntry={true}
              selectionColor={'orange'}
              maxLength={20}
            />
          </View>
        </View>
        <TouchableOpacity 
          className={`flex justify-center items-center rounded-3xl w-[90] h-[42px] self-end ${loginButtonDisabled || loading ? 'bg-gray-400' : 'bg-primary-200'}`} 
          disabled={loginButtonDisabled}
          onPress={() => login()}
          >
          <RTLText className='text-white text-2xl font-waheed' style={{ letterSpacing: 0.8 }}>ލޮގްއިން</RTLText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )}