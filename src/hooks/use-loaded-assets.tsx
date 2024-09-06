import Ionicons from '@expo/vector-icons/Ionicons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { noop } from 'lodash';

export function useLoadedAssets() {
    const [isAssetsLoadingComplete, setAssetsLoadingComplete] = React.useState(false);

    // Load any resources or data that we need prior to rendering the app
    React.useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                await SplashScreen.preventAutoHideAsync();
                dayjs.extend(relativeTime);
                dayjs.locale('zh-cn');
                // Load fonts
                await Font.loadAsync(Ionicons.font);
            } catch (e) {
                // We might want to provide this error information to an error reporting service
                console.warn(e);
            } finally {
                setAssetsLoadingComplete(true);
                await SplashScreen.hideAsync();
            }
        }

        loadResourcesAndDataAsync().then(noop);
    }, []);

    return isAssetsLoadingComplete;
}
