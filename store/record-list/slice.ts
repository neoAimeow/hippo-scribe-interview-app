/* eslint-disable @typescript-eslint/no-unused-vars */
import { StateCreator } from 'zustand/vanilla';

import { RecordListSliceType, recordSchema } from './type';
import { initialList } from './state';
import { z } from 'zod';
import { StoreType } from '../type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LIST_KEY } from './constant';
import { Toast } from 'react-native-toast-notifications';
import { cloneDeep } from 'lodash';

export const createListSlice: StateCreator<
    StoreType,
    [['zustand/devtools', never], ['zustand/immer', never]],
    [],
    RecordListSliceType
> = (set, get) => ({
    list: initialList,
    getList: async () => {
        const list = await AsyncStorage.getItem(LIST_KEY);
        if (!list) {
            return;
        }
        try {
            const parsedList = JSON.parse(list);
            set({ list: { list: parsedList } });
            return parsedList;
        } catch (ex) {
            Toast.show('parse json failed');
        }
    },
    addRecord: async (record: z.infer<typeof recordSchema>) => {
        try {
            const data = recordSchema.parse(record);
            const list = cloneDeep(get().list.list);
            list.push(data);
            try {
                await AsyncStorage.setItem(LIST_KEY, JSON.stringify(list));
                set({ list: { list } });
            } catch (e) {
                Toast.show('save data failed');
            }
        } catch (ex) {
            Toast.show('parse schema failed');
        }
    },
    removeRecord: async (id: string) => {
        const list = cloneDeep(get().list.list);
        const filteredList = list.filter(i => i.id !== id);
        await AsyncStorage.setItem(LIST_KEY, JSON.stringify(filteredList));
        set({ list: { list: filteredList } });
    },
});
