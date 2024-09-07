import { Pressable, Text, View } from 'react-native';
import { useRecordStore } from '../store';
import { RecordingStateEnum } from '../store/record-state/type';
import OptionButton, { ButtonOption } from '../components/option.button';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useCallback } from 'react';
import { router } from 'expo-router';
import dayjs from 'dayjs';

export default function Home() {
    const [recordingState, startRecording, stopRecording, pauseRecording, resumeRecording, durationMills] =
        useRecordStore(s => [
            s.state.recordingState,
            s.startRecording,
            s.stopRecording,
            s.pauseRecording,
            s.resumeRecording,
            s.state.durationMills,
        ]);

    const goList = useCallback(() => {
        router.push('/list');
    }, []);

    return (
        <SafeAreaView>
            <View className={'w-full h-full'}>
                <View className={'w-full'}>
                    <Pressable onPress={goList}>
                        <View className={'ml-4'}>
                            <Ionicons name="menu-outline" size={30} color={'white'}></Ionicons>
                        </View>
                    </Pressable>
                </View>
                <View className={'w-full flex-grow flex items-center justify-center'}>
                    <Text className={'text-3xl text-white'}>
                        {recordingState !== RecordingStateEnum.IDLE ? dayjs(durationMills).format('mm:ss') : '00:00'}
                    </Text>
                    <View className={'mt-[30px] w-full flex justify-center items-center'}>
                        {recordingState === RecordingStateEnum.IDLE ? (
                            <OptionButton type={ButtonOption.MIC} onPress={startRecording} />
                        ) : (
                            <View className={'flex flex-row w-full justify-around'}>
                                {recordingState === RecordingStateEnum.RECORDING && (
                                    <OptionButton type={ButtonOption.PAUSE} onPress={pauseRecording} />
                                )}
                                {recordingState === RecordingStateEnum.PAUSED && (
                                    <OptionButton type={ButtonOption.PLAY} onPress={resumeRecording} />
                                )}
                                <OptionButton type={ButtonOption.STOP} onPress={stopRecording} />
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
