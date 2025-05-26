import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';

export default function BackButton() {
  return (
    <TouchableOpacity onPress={() => router.back()}>
      <FontAwesome size={26} name='arrow-circle-left' color={'orange'}/>
    </TouchableOpacity>
  )};