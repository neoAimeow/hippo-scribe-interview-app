import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigatorHeader from '../components/navigator-header';
import { FlashList } from '@shopify/flash-list';
import { useCallback, useEffect, useState } from 'react';
import { z } from 'zod';
import { recordSchema, recordsSchema } from '../store/record-list/type';
import { useRecordStore } from '../store';
import { router } from 'expo-router';

export default function AudioList() {
    const [getList, removeRecord] = useRecordStore(s => [s.getList, s.removeRecord]);
    const [list, setList] = useState<z.infer<typeof recordsSchema>>([]);

    useEffect(() => {
        getList().then(data => {
            setList(data);
        });
    }, [getList, list]);

    const deleteFunc = useCallback(
        (id: string) => {
            if (!id) {
                return;
            }
            removeRecord(id);
        },
        [removeRecord],
    );

    const renderItem = ({ item }: { item: z.infer<typeof recordSchema> }) => {
        return (
            <Pressable
                className={'w-full flex flex-row items-center justify-around bg-green-300'}
                onPress={() => router.push({ pathname: '/detail', params: { id: item.id } })}
            >
                <View className={'h-[50px] w-4/6 flex justify-center'}>
                    <Text className={'truncate line-clamp-1'}>{item.id}</Text>
                </View>
                <Pressable
                    className={'bg-red-400 flex flex-row justify-center items-center h-[30px] w-[50px]'}
                    onPress={() => {
                        deleteFunc(item.id);
                    }}
                >
                    <Text>Delete</Text>
                </Pressable>
            </Pressable>
        );
    };

    return (
        <View>
            <SafeAreaView>
                <NavigatorHeader />
                <View className="w-full h-full">
                    <FlashList<z.infer<typeof recordSchema>>
                        data={list}
                        renderItem={renderItem}
                        estimatedItemSize={200}
                    />
                </View>
            </SafeAreaView>
        </View>
    );
}
