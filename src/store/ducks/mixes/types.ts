import { RequestState } from '../types';

export interface Mix {
  id: string;
  name: string;
}

export enum MixRequestTypes {
  LIST_REQUEST = '@mix/LIST_REQUEST',
  LIST_SUCCESS = '@mix/LIST_SUCCESS',
  LIST_FAILURE = '@mix/LIST_FAILURE',

  CREATE_REQUEST = '@mix/CREATE_REQUEST',
  CREATE_SUCCESS = '@mix/CREATE_SUCCESS',
  CREATE_FAILURE = '@mix/CREATE_FAILURE',

  GET_BY_ID_REQUEST = '@mix/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@mix/GET_BY_ID_SUCCESS',
  GET_BY_ID_FAILURE = '@mix/GET_BY_ID_FAILURE',
}

export enum MixTypes {
  APPEND_ON_LIST = '@mix/APPEND_ON_LIST',
}

export type ListMixesState = RequestState<Mix>;
export type CreateMixState = RequestState;
export type GetMixState = RequestState;
