/* eslint-disable @typescript-eslint/no-unused-vars */
import { StateCreator } from 'zustand/vanilla';

import { initialState } from './state';
import { MicStateType } from './type';

export const createStateSlice: StateCreator<
    MicStateType,
    [['zustand/devtools', never], ['zustand/immer', never]],
    [],
    MicStateType
> = (set, get) => ({
    state: initialState,
    setRecording: (isRecording: boolean) => {
        set(draft => {
            draft.state.isRecording = isRecording;
        });
    },
});
