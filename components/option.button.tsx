import { Pressable } from 'expo-router/build/views/Pressable';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { z } from 'zod';
import { noop } from 'lodash';

export enum ButtonOption {
    PLAY = 'play',
    STOP = 'stop',
    PAUSE = 'pause',
    MIC = 'mic',
}

const iconMap = new Map<ButtonOption, 'mic-outline' | 'play' | 'stop' | 'pause'>([
    [ButtonOption.MIC, 'mic-outline'],
    [ButtonOption.PLAY, 'play'],
    [ButtonOption.STOP, 'stop'],
    [ButtonOption.PAUSE, 'pause'],
]);

const propSchema = z.object({
    onPress: z.function(),
    type: z.nativeEnum(ButtonOption),
});

export default function OptionButton(props: z.infer<typeof propSchema>) {
    const { onPress = noop, type } = props;

    return (
        <Pressable onPress={onPress}>
            <View className={'w-[70px] h-[70px] bg-white flex items-center justify-center rounded-full shadow-2xl'}>
                <Ionicons size={40} name={iconMap.get(type) || 'play'}></Ionicons>
            </View>
        </Pressable>
    );
}
