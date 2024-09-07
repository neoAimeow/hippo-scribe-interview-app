import { Text, View } from 'react-native';
import MicButton from '../components/mic.button';
import { useStateStore } from '../store';
import PauseButton from '../components/pause.button';
import StopButton from '../components/stop.button';
import { RecordingStateEnum } from '../store/slice/type';
import PlayButton from '../components/play.button';

export default function Home() {
    const [recordingState, startRecording, stopRecording, pauseRecording, resumeRecording] = useStateStore(s => [
        s.state.recordingState,
        s.startRecording,
        s.stopRecording,
        s.pauseRecording,
        s.resumeRecording,
    ]);

    return (
        <View className={'w-full h-full flex items-center justify-center'}>
            {recordingState === RecordingStateEnum.IDLE ? (
                <MicButton onPress={startRecording} />
            ) : (
                <View className={'flex flex-row w-full justify-around'}>
                    {recordingState === RecordingStateEnum.RECORDING && <PauseButton onPress={pauseRecording} />}
                    {recordingState === RecordingStateEnum.PAUSED && <PlayButton onPress={resumeRecording} />}
                    <StopButton onPress={stopRecording} />
                </View>
            )}
        </View>
    );
}
