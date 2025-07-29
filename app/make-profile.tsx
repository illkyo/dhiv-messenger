import { View, Text, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import RTLText from '@/components/RTLText';
import { useState, useEffect } from 'react';
import DhivehiFormField from '@/components/DhivehiFormField';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '@/lib/supabase';
import { useGlobalContext } from '@/lib/global-provider';
import * as ImagePicker from 'expo-image-picker';

export default function MakeProfile() {
  
  const { session, fetchProfile } = useGlobalContext();
  const defaultAvatar = supabase.storage.from('avatars').getPublicUrl('default-avatar.jpeg').data.publicUrl;

  const [avatarImage, setAvatarImage] = useState<ImagePicker.ImagePickerAsset>();
  const [avatarChanged, setAvatarChanged] = useState(false);
  const [name, setName] = useState('');
  // const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [uploading, setUploading] = useState(false);

  async function submitProfile() {
    try {
      setLoading(true)
      const { error } = await supabase
        .from('profiles')
        .insert({  
          name: name,
          email: validateEmail(email) ? email : null,
          avatar: avatarChanged && avatarImage ? await uploadAvatar(avatarImage) : defaultAvatar
        })
        if (error) throw error
        if (session) await fetchProfile(session)
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
        console.log(error.message)
      }
    } finally {
      setLoading(false)
    }
  };

  async function uploadAvatar(avatarImage: ImagePicker.ImagePickerAsset) {
    try {
      setUploading(true)
      const arrayBuffer = await fetch(avatarImage.uri).then((res) => res.arrayBuffer());
      const fileExt = avatarImage.uri?.split('.').pop()?.toLowerCase() ?? 'jpeg';
      const path = `${Date.now()}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(path, arrayBuffer, {
          contentType: avatarImage.mimeType ?? 'image/jpeg',
      });
      if (uploadError) {
        throw uploadError
      };
      return data.fullPath
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
        console.log(error.message);
      } else {
        throw error
      };
    } finally {
      setUploading(true);
    }
  };

  async function changeAvatar() {
    try {
      const { status, granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log(`--- MEDIA LIBRARY PERMISSION --- ${status}`);
      if (!granted) {
          Alert.alert("Access to media library not granted.");
          return
      };
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        allowsMultipleSelection: false,
        aspect:[1, 1],
        quality: 1,
      });

      if (result.canceled || result.assets.length === 0 || !result.assets) {
        console.log('No image was selected.');
      } else {
        const image = result.assets[0];
        console.log(`--- IMAGE --- ${image}`);
        if (!image.uri) {
          throw new Error('No Image URI');
        };
        setAvatarImage(image);
        setAvatarChanged(true);
      };
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
        console.log(error.message);
      } else {
        throw error
      }
    } 
  };

  function validateEmail(email: string) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  useEffect(() => {
    if (name.length > 3) {
      setSubmitButtonDisabled(false);
    } else {
      setSubmitButtonDisabled(true);
    }
  }, [name]);

  return (
    <SafeAreaView className='flex gap-8 p-8'>
      <View className='flex justify-center items-center gap-2'>
        <View className='flex justify-center items-center gap-1'>
          <RTLText className='font-waheed text-3xl w-[60px]'>ޕްރޮފައިލް</RTLText>
          <Text className='font-faruma text-base text-gray-500'>ފީލްޑުތައް ފުރުއްވާ</Text>
        </View>
        <View>
          {
            uploading ?       
            <View className="bg-white flex justify-center items-center rounded-full size-20">
              <ActivityIndicator className="text-primary-300" size='large' />
            </ View>
            :
            <TouchableOpacity className='flex justify-center items-center relative' onPress={() => {changeAvatar()}}>
              {
                avatarChanged ?
                <Image className='size-20 rounded-full' source={{ uri: avatarImage?.uri }} />
                :
                <Image className='size-20 rounded-full' source={{ uri: defaultAvatar }} />
              }
              <TouchableOpacity className='bg-primary-200 size-[22px] rounded-full flex justify-center items-center absolute bottom-0 right-0'>
                <FontAwesome size={10} name='plus' color='white'/>
              </TouchableOpacity>
            </TouchableOpacity>
          }
        </View>
      </View>
      <View className='flex gap-5'>
        <DhivehiFormField title='ނަން' value={name} maxLength={20} required={true} onFieldEntry={(input) => {setName(input);}}/>
        {/* <DhivehiFormField title='ޕާސްވޯޑް' value={password} required={true} onFieldEntry={(input) => setPassword(input)}/> */}
        <DhivehiFormField title='އީމެއިލް' value={email} maxLength={40} onFieldEntry={(input) => setEmail(input)}/>
      </View>
      <TouchableOpacity
        className={`flex justify-center self-center items-center rounded-3xl w-[100px] h-[42px] ${submitButtonDisabled || loading ? 'bg-gray-400' : 'bg-primary-200'}`}
        onPress={() => {submitProfile()}}
        disabled={submitButtonDisabled || loading}
        >
        <Text className='text-white text-2xl font-waheed'>ސަބްމިޓް</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={`flex justify-center self-center items-center rounded-3xl w-[100px] h-[42px] bg-primary-200`}
        onPress={() => {console.log(avatarImage)}}
        >
        <Text className='text-white text-2xl font-waheed'>ސަބްމިޓް</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )}