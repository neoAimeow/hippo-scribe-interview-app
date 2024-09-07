import { Slot } from 'expo-router';
import { useLoadedAssets } from '../hooks/use-loaded-assets';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from 'react-native-toast-notifications';
import { LinearGradient } from 'expo-linear-gradient';

export default function RootLayout() {
    const isAssetsLoadingComplete = useLoadedAssets();

    if (!isAssetsLoadingComplete) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <ToastProvider duration={2000} animationDuration={250} offsetBottom={100}>
                <LinearGradient style={{ width: '100%', height: '100%' }} colors={['#6ee787', '#5fcbb6', '#3caecc']}>
                    <Slot />
                </LinearGradient>
            </ToastProvider>
        </SafeAreaProvider>
    );
}
