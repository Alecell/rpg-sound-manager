import { RequestState } from '../types';

export interface Sound {
  id: string;
  name: string;
  file: string;
}

export interface SoundOptions {
  start: number;
  end: number;
  volume: number;
  muted: boolean;
}

export enum SoundRequestTypes {
  LIST_REQUEST = '@sound/LIST_REQUEST',
  LIST_SUCCESS = '@sound/LIST_SUCCESS',
  LIST_FAILURE = '@sound/LIST_FAILURE',

  CREATE_REQUEST = '@sound/CREATE_REQUEST',
  CREATE_SUCCESS = '@sound/CREATE_SUCCESS',
  CREATE_FAILURE = '@sound/CREATE_FAILURE',

  GET_BY_ID_REQUEST = '@sound/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@sound/GET_BY_ID_SUCCESS',
  GET_BY_ID_FAILURE = '@sound/GET_BY_ID_FAILURE',
}

export type ListSoundsState = RequestState<Sound>;
export type CreateSoundState = RequestState;
