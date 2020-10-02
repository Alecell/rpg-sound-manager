import { SyntheticEvent } from 'react';

export type AudioEvent = SyntheticEvent<HTMLAudioElement, Event>;
export type ValueUpdate = (value: number, event: AudioEvent) => void;
