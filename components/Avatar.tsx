import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Props {  
    size?: number  
    url: string | null  
}

export default function Avatar( { url, size = 20 }: Props ) {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [downloading, setDownloading] = useState(false);
    
    async function downloadImage(path: string) {
        try {
            setDownloading(true)
            const { data, error } = await supabase.storage.from('avatars').download(path)
            if (error) throw error
            const fr = new FileReader()
            fr.readAsDataURL(data)
            fr.onload = () => {
                setAvatarUrl(fr.result as string)
            }
        } catch (error) {
          if (error instanceof Error) {
            console.log('Error downloading image: ', error.message)
          }
        } finally {
          setDownloading(false)
        }
    };

    useEffect(() => {
        if (url) downloadImage(url)
    }, [url]);

    
  return (
    <View className='flex justify-center items-center'>
        {   downloading ?        
                <View className="bg-white flex justify-center items-center rounded-full size-20">
                    <ActivityIndicator className="text-primary-300" size='large' />
                </ View>
                : ( avatarUrl ?
                    <TouchableOpacity>
                        <Image source={{ uri: avatarUrl }} className={`size-${size} rounded-full`} />
                    </TouchableOpacity>
                    : <Text>Avatar</Text> )
        }
        <Text>Avatar</Text>
    </View>
  )}