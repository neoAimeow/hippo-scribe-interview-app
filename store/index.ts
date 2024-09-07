import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { StateCreator } from 'zustand/vanilla';
import { createStateSlice } from './record-state/slice';
import { immer } from 'zustand/middleware/immer';
import { createListSlice } from './record-list/slice';
import { StoreType } from './type';

const createStore: StateCreator<StoreType, [['zustand/devtools', never], ['zustand/immer', never]]> = (...params) => ({
    ...createStateSlice(...params),
    ...createListSlice(...params),
});

export const useRecordStore = createWithEqualityFn<StoreType, [['zustand/devtools', never], ['zustand/immer', never]]>(
    devtools(immer(createStore), { name: 'record' }),
    shallow,
);
