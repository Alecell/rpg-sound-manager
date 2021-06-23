import { Scene } from '../scenes/types';
import { RequestState } from '../types';

export interface MixCollection {
  sceneId?: Scene['id'];
}

export interface Mix {
  id: string;
  name: string;
}

export enum MixRequestTypes {
  CREATE_REQUEST = '@mix/CREATE_REQUEST',
  CREATE_SUCCESS = '@mix/CREATE_SUCCESS',
  CREATE_FAILURE = '@mix/CREATE_FAILURE',
}

export type ListMixesState = RequestState<Mix & MixCollection>;
export type CreateMixState = RequestState;
export type GetMixState = RequestState;
