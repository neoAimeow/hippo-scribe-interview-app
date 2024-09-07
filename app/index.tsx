import { Text, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { useEffect } from 'react';

export default function Home() {
    return (
        <View className={'bg-blue-500'}>
            <Text>Router Notes</Text>
        </View>
    );
}
