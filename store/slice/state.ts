import { MicState } from './type';
import { z } from 'zod';

export const initialState: z.infer<typeof MicState> = {
    isRecording: false,
};
