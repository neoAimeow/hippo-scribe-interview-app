import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { StateCreator } from 'zustand/vanilla';
import { MicStateType } from './slice/type';
import { createStateSlice } from './slice/slice';
import { immer } from 'zustand/middleware/immer';

type StoreType = MicStateType;
const createStore: StateCreator<StoreType, [['zustand/devtools', never], ['zustand/immer', never]]> = (...params) => ({
    ...createStateSlice(...params),
});

export const useStateStore = createWithEqualityFn<StoreType, [['zustand/devtools', never], ['zustand/immer', never]]>(
    devtools(immer(createStore), { name: 'state' }),
    shallow,
);
