import { Text, View, Image, Pressable, PixelRatio } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { noop } from 'lodash';
import { router } from 'expo-router';
import { z } from 'zod';

const navigatorProps = z.object({
    title: z.string().optional(),
    backEvent: z.function().optional(),
});

const NavigatorHeader = (props: z.infer<typeof navigatorProps>) => {
    const { title, backEvent = noop } = props;
    return (
        <View className="h-11 w-screen flex-row items-center">
            <Pressable
                className="ml-4"
                onPress={() => {
                    router.back();

                    if (backEvent) {
                        backEvent();
                    }
                }}
            >
                <Ionicons name="chevron-back-outline" size={25} />
            </Pressable>
            {title && (
                <View className="ml-2">
                    <Text className="text-lg" numberOfLines={1}>
                        {title}
                    </Text>
                </View>
            )}
        </View>
    );
};

export default NavigatorHeader;
