/* eslint-disable @typescript-eslint/no-unused-vars */
import { StateCreator } from 'zustand/vanilla';

import { initialState } from './state';
import { MicStateType, RecordingStateEnum } from './type';
import { Audio } from 'expo-av';
import { Toast } from 'react-native-toast-notifications';
import { router } from 'expo-router';
import * as Crypto from 'expo-crypto';
import { StoreType } from '../type';

export const createStateSlice: StateCreator<
    StoreType,
    [['zustand/devtools', never], ['zustand/immer', never]],
    [],
    MicStateType
> = (set, get) => ({
    state: initialState,
    startRecording: async () => {
        try {
            const permissionResponse = await Audio.getPermissionsAsync();
            if (!permissionResponse) {
                Toast.show('permissionResponse is undefined.');
                return;
            }
            if (permissionResponse.status !== 'granted') {
                console.log('Requesting permission..');
                await Audio.requestPermissionsAsync();
            }
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            console.log('Starting recording..');
            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY,
                (status: Audio.RecordingStatus) => {
                    set(draft => {
                        draft.state.durationMills = status.durationMillis;
                    });
                },
            );
            set(draft => {
                draft.state.recording = recording;
                draft.state.recordingState = RecordingStateEnum.RECORDING;
            });
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
            Toast.show('Failed to start recording');
            set(draft => {
                draft.state.recordingState = RecordingStateEnum.IDLE;
            });
        }
    },
    stopRecording: async () => {
        const recording = get().state.recording;
        if (recording) {
            await recording.stopAndUnloadAsync();

            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
            });
            const uri = recording.getURI() || '';
            const digest = Crypto.randomUUID();
            set(draft => {
                draft.state.recording = undefined;
                draft.state.recordingState = RecordingStateEnum.IDLE;
                draft.addRecord({ id: digest, path: uri });
            });
            console.log('Recording stopped and stored at', uri);
            router.push({ pathname: '/detail', params: { id: digest } });
        }
    },
    pauseRecording: async () => {
        const recording = get().state.recording;
        if (recording) {
            await recording.pauseAsync();
            set(draft => {
                draft.state.recordingState = RecordingStateEnum.PAUSED;
            });
        }
    },
    resumeRecording: async () => {
        const recording = get().state.recording;
        if (recording) {
            await recording.startAsync();
            set(draft => {
                draft.state.recordingState = RecordingStateEnum.RECORDING;
            });
        }
    },
});
