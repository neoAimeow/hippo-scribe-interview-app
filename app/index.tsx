import { Text, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable } from 'expo-router/build/views/Pressable';
import Ionicons from '@expo/vector-icons/Ionicons';
import MicButton from '../components/mic-button';

export default function Home() {
    return (
        <LinearGradient style={{ width: '100%', height: '100%' }} colors={['#6ee787', '#5fcbb6', '#3caecc']}>
            <Text>test</Text>
            <MicButton onPress={() => {}} />
        </LinearGradient>
    );
}
