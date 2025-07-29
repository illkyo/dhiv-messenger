import { View, Text, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Props {  
    size: number  
    url: string | null  
}

export default function Avatar( { url, size = 20 }: Props ) {
    const [ avatarUrl, setAvatarUrl ] = useState<string | null>(null)

    useEffect(() => {
        if (url) downloadImage(url)
    }, [url])

    async function downloadImage(path: string) {
        try {
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
        }
    }
    
  return (
    <View className='flex justify-center items-center border border-red-500'>
        {
            avatarUrl ?
            <Image source={{ uri: avatarUrl }} className={`size-${size} rounded-full`} />
            :
            <Text>Avatar</Text>
        }
    </View>
  )}