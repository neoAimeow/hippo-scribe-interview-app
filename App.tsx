import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
    return (
        <SafeAreaProvider>
            <View className="flex-1 items-center justify-center bg-red-500">
                <Text>Open up App.tsx test123123 to start working on your app!</Text>
                <StatusBar style="auto" />
                <Ionicons size={80} name={'bag-add-outline'} />
            </View>
        </SafeAreaProvider>
    );
}
