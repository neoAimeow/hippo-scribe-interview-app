import { Text, View } from 'react-native';
import MicButton from '../components/mic.button';
import { useStateStore } from '../store';
import PauseButton from '../components/pause.button';
import StopButton from '../components/stop.button';
import { RecordingStateEnum } from '../store/slice/type';
import PlayButton from '../components/play.button';

export default function AudioDetail() {
    return (
        <View className={'w-full h-full flex items-center justify-center'}>
            <Text>detail</Text>
        </View>
    );
}
