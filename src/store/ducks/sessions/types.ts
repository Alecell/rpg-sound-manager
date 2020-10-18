import { Campaign } from '../campaigns/types';
import { RequestState } from '../types';

export interface SessionCollection {
  campaignId?: Campaign['id'];
}

export interface Session {
  id: string;
  name: string;
}

export enum SessionsRequestTypes {
  LIST_REQUEST = '@sessions/LIST_REQUEST',
  LIST_SUCCESS = '@sessions/LIST_SUCCESS',
  LIST_FAILURE = '@sessions/LIST_FAILURE',
  LIST_CANCEL = '@sessions/LIST_CANCEL',

  CREATE_REQUEST = '@sessions/CREATE_REQUEST',
  CREATE_SUCCESS = '@sessions/CREATE_SUCCESS',
  CREATE_FAILURE = '@sessions/CREATE_FAILURE',

  GET_BY_ID_REQUEST = '@sessions/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@sessions/GET_BY_ID_SUCCESS',
  GET_BY_ID_FAILURE = '@sessions/GET_BY_ID_FAILURE',
  GET_BY_ID_CANCEL = '@sessions/GET_BY_ID_CANCEL',
}

export enum SessionsTypes {
  APPEND_ON_LIST = '@sessions/APPEND_ON_LIST'
}

export type ListSessionsState = RequestState<Session & SessionCollection>;
export type GetSessionState = RequestState;
export type CreateSessionState = RequestState;
