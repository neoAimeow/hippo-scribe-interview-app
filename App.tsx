import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from 'react-native-toast-notifications';
import { useLoadedAssets } from './hooks/use-loaded-assets';

export default function App() {
    const isAssetsLoadingComplete = useLoadedAssets();

    if (!isAssetsLoadingComplete) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <ToastProvider duration={2000} animationDuration={250} offsetBottom={100}>
                <View className="flex-1 items-center justify-center bg-red-500">
                    <Text>Open up App.tsx test123123 to start working test on your app!</Text>
                    <StatusBar style="auto" />
                    <Ionicons size={80} name={'bag-add-outline'} />
                </View>
            </ToastProvider>
        </SafeAreaProvider>
    );
}
