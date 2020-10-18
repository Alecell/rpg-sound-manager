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
  LIST_REQUEST = '@mix/LIST_REQUEST',
  LIST_SUCCESS = '@mix/LIST_SUCCESS',
  LIST_FAILURE = '@mix/LIST_FAILURE',
  LIST_CANCEL = '@mix/LIST_CANCEL',

  CREATE_REQUEST = '@mix/CREATE_REQUEST',
  CREATE_SUCCESS = '@mix/CREATE_SUCCESS',
  CREATE_FAILURE = '@mix/CREATE_FAILURE',

  GET_BY_ID_REQUEST = '@mix/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@mix/GET_BY_ID_SUCCESS',
  GET_BY_ID_FAILURE = '@mix/GET_BY_ID_FAILURE',
  GET_BY_ID_CANCEL = '@mix/GET_BY_ID_CANCEL',
}

export enum MixTypes {
  APPEND_ON_LIST = '@mix/APPEND_ON_LIST',
}

export type ListMixesState = RequestState<Mix & MixCollection>;
export type CreateMixState = RequestState;
export type GetMixState = RequestState;
