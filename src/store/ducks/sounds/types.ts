import { RequestState } from '../types';

export interface SoundConfig {
  start: number;
  end: number;
  volume: number;
  mute: boolean;
  loop: boolean;
}

export interface Sound {
  id: string;
  name: string;
  url: string;
  config: SoundConfig;
}

export enum SoundRequestTypes {
  CREATE_REQUEST = '@sound/CREATE_REQUEST',
  CREATE_SUCCESS = '@sound/CREATE_SUCCESS',
  CREATE_FAILURE = '@sound/CREATE_FAILURE',

  SET_CONFIG_REQUEST = '@sound/SET_CONFIG_REQUEST',
  SET_CONFIG_SUCCESS = '@sound/SET_CONFIG_SUCCESS',
  SET_CONFIG_FAILURE = '@sound/SET_CONFIG_FAILURE',

  DELETE_REQUEST = '@sound/DELETE_REQUEST',
  DELETE_SUCCESS = '@sound/DELETE_SUCCESS',
  DELETE_FAILURE = '@sound/DELETE_FAILURE',
}

export type ListSoundsState = RequestState<Sound>;
export type DeleteSoundState = RequestState;
export type CreateSoundState = RequestState;
export type SetConfigSoundState = RequestState;
