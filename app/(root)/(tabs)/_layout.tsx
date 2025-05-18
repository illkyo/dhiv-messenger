import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';

interface TabIconOptions {
  title: string;
  focused: boolean;
  imageName: React.ComponentProps<typeof FontAwesome>['name'];
};

function TabIcon({ title, focused, imageName }: TabIconOptions) {
  return (
    <View className='flex-1 flex flex-col items-center'>
      <FontAwesome size={28} name={imageName} color={focused ? '#D77A1D' : 'gray'}/>
      <Text className={`${focused ? 'text-primary-300' : 'text-gray-600'} w-full text-center font-faruma`}> 
        {title}
      </Text>
    </View>
  )};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon title='ޗެޓް' imageName="wechat" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon title='ކޯލް' imageName="phone" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon title='ރެޖިސްޓަރ' imageName="plus" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="enter-otp"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon title='އޯޓީޕީ' imageName="minus" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="login-choice"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon title='ލޮގްއިން' imageName="star" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="make-profile"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon title='ޕްރޮފައިލް' imageName="glass" focused={focused} />,
        }}
      />
    </Tabs>
  );
}