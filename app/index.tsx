import { Text, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import MicButton from '../components/mic-button';
import { Audio } from 'expo-av';

export default function Home() {
    return (
        <LinearGradient style={{ width: '100%', height: '100%' }} colors={['#6ee787', '#5fcbb6', '#3caecc']}>
            <Text>Welcome</Text>
            <MicButton onPress={() => {}} />
        </LinearGradient>
    );
}
