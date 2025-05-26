import { Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function TabOneScreen() {
  return (
    <View className='flex flex-1 justify-center items-center bg-red'>
      <Text className='text-3xl font-faruma'>ފުރަތަމަ ޓެބް</Text>
      <Link href={'/login-choice'}>{'Login >>'}</Link>
    </View>
  )};
