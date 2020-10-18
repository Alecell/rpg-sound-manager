import { Mix } from '../mixes/types';
import { Scene } from '../scenes/types';
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
  LIST_REQUEST = '@sound/LIST_REQUEST',
  LIST_SUCCESS = '@sound/LIST_SUCCESS',
  LIST_FAILURE = '@sound/LIST_FAILURE',

  CREATE_REQUEST = '@sound/CREATE_REQUEST',
  CREATE_SUCCESS = '@sound/CREATE_SUCCESS',
  CREATE_FAILURE = '@sound/CREATE_FAILURE',

  SET_CONFIG_REQUEST = '@sound/SET_CONFIG_REQUEST',
  SET_CONFIG_SUCCESS = '@sound/SET_CONFIG_SUCCESS',
  SET_CONFIG_FAILURE = '@sound/SET_CONFIG_FAILURE',
}

export type ListSoundsState = RequestState<Sound & { collectionId?: Mix['id'] | Scene['id']; }>;
export type CreateSoundState = RequestState;
export type SetConfigSoundState = RequestState;
