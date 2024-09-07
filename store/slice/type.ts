import { z } from 'zod';

export const MicState = z.object({
    isRecording: z.boolean(),
});

export interface MicStateSliceType {
    state: z.infer<typeof MicState>;
    setRecording: (isRecording: boolean) => void;
}

export type MicStateType = MicStateSliceType;
