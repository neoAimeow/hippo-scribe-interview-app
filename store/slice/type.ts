import { z } from 'zod';
import { Audio } from 'expo-av';

export const MicState = z.object({
    recording: z.custom<Audio.Recording>().optional(),
});

export interface MicStateSliceType {
    state: z.infer<typeof MicState>;
    setRecording: (isRecording: Audio.Recording) => void;
    startRecording: () => void;
    stopRecording: () => void;
}

export type MicStateType = MicStateSliceType;
