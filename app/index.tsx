import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MicButton from '../components/mic.button';
import { useStateStore } from '../store';
import PauseButton from '../components/pause.button';
import StopButton from '../components/stop.button';
import { RecordingStateEnum } from '../store/slice/type';

export default function Home() {
    const [recordingState, startRecording, stopRecording, pauseRecording] = useStateStore(s => [
        s.state.recordingState,
        s.startRecording,
        s.stopRecording,
        s.pauseRecording,
    ]);

    return (
        <LinearGradient style={{ width: '100%', height: '100%' }} colors={['#6ee787', '#5fcbb6', '#3caecc']}>
            <View className={'w-full h-full flex items-center justify-center'}>
                <Text className={'text-3xl font-bold'}>Welcome</Text>
                <View>
                    {recordingState === RecordingStateEnum.IDLE ? (
                        <MicButton onPress={startRecording} />
                    ) : (
                        <View className={'flex flex-row gap-5'}>
                            <PauseButton onPress={pauseRecording} />
                            <StopButton onPress={stopRecording} />
                        </View>
                    )}
                </View>
            </View>
        </LinearGradient>
    );
}
