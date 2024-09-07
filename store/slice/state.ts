import { MicState, RecordingStateEnum } from './type';
import { z } from 'zod';

export const initialState: z.infer<typeof MicState> = {
    recording: undefined,
    recordingState: RecordingStateEnum.IDLE,
};
