import { Pressable } from 'expo-router/build/views/Pressable';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { z } from 'zod';
import { noop } from 'lodash';
import { Audio } from 'expo-av';
import { useToast } from 'react-native-toast-notifications';
import { useState } from 'react';

const propSchema = z.object({
    onPress: z.function(),
});

export default function MicButton(props: z.infer<typeof propSchema>) {
    const { onPress = noop } = props;
    const [recording, setRecording] = useState<Audio.Recording>();
    const toast = useToast();

    return (
        <Pressable onPress={onPress}>
            <View className={'w-[70px] h-[70px] bg-white flex items-center justify-center rounded-full shadow-2xl'}>
                <Ionicons size={40} name="mic-outline"></Ionicons>
            </View>
        </Pressable>
    );
}
