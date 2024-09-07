import { z } from 'zod';
import { Audio } from 'expo-av';

export enum RecordingStateEnum {
    IDLE = 'IDLE',
    RECORDING = 'RECORDING',
    PAUSED = 'PAUSED',
}

export const MicState = z.object({
    recording: z.custom<Audio.Recording>().optional(),
    recordingState: z.nativeEnum(RecordingStateEnum),
});

export interface MicStateSliceType {
    state: z.infer<typeof MicState>;
    startRecording: () => void;
    stopRecording: () => void;
    pauseRecording: () => void;
}

export type MicStateType = MicStateSliceType;
