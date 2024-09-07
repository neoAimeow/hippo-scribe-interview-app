import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCallback, useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { z } from 'zod';
import { recordSchema } from '../../store/record-list/type';
import { PlayStateEnum } from './_type';
import { AVPlaybackStatusSuccess } from 'expo-av/src/AV.types';
import { ButtonOption } from '../../components/option.button';
import NavigatorHeader from '../../components/navigator-header';
import OptionButton from '../../components/option.button';
import { LIST_KEY } from '../../store/record-list/constant';

export default function AudioDetail() {
    const [state, setState] = useState<PlayStateEnum>(PlayStateEnum.IDLE);
    const [record, setRecord] = useState<z.infer<typeof recordSchema>>();
    const [sound, setSound] = useState<Audio.Sound>();
    const { id } = useLocalSearchParams<{ id: string }>();

    useEffect(() => {
        if (!sound) return;
        sound._onPlaybackStatusUpdate = status => {
            if ((status as AVPlaybackStatusSuccess).didJustFinish) {
                setState(PlayStateEnum.IDLE);
            }
        };
    }, [sound]);

    useEffect(() => {
        AsyncStorage.getItem(LIST_KEY).then(value => {
            if (!value) return;
            const data: z.infer<typeof recordSchema>[] = JSON.parse(value);
            const item = Array.from(data).find(i => {
                return i.id === id;
            });
            item && setRecord(item);
        });
    }, [id]);

    useEffect(() => {
        if (!record) return;
        Audio.Sound.createAsync({ uri: record.path }).then(({ sound }) => {
            setSound(sound);
        });
    }, [record]);

    const playRecord = useCallback(async () => {
        if (!sound) {
            return;
        }
        setState(PlayStateEnum.PLAYING);
        await sound.replayAsync();
    }, [sound]);

    const stopRecord = useCallback(async () => {
        if (!sound) {
            return;
        }
        setState(PlayStateEnum.IDLE);
        await sound.stopAsync();
    }, [sound]);

    const pauseRecord = useCallback(async () => {
        if (!sound) {
            return;
        }
        setState(PlayStateEnum.PAUSED);
        await sound.pauseAsync();
    }, [sound]);

    useEffect(() => {
        return sound
            ? () => {
                  console.log('Unloading Sound');
                  sound.unloadAsync();
              }
            : undefined;
    }, [sound]);

    return (
        <SafeAreaView>
            <View className={'flex flex-col'}>
                <NavigatorHeader title={record?.path} />
                <View className={'w-full h-full'}>
                    <View className={'w-full h-full flex items-center'}>
                        <Text className={'mt-[30px]'}>{id}</Text>
                        <View className={'flex flex-row w-full mt-[30px] justify-around'}>
                            {state === PlayStateEnum.PLAYING ? (
                                <OptionButton type={ButtonOption.PAUSE} onPress={pauseRecord} />
                            ) : (
                                <OptionButton type={ButtonOption.PLAY} onPress={playRecord} />
                            )}
                            {state !== PlayStateEnum.IDLE && (
                                <OptionButton type={ButtonOption.STOP} onPress={stopRecord} />
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
