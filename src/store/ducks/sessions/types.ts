import { RequestState } from '../types';

export interface Session {
  id: string;
  name: string;
}

export enum SessionsRequestTypes {
  LIST_REQUEST = '@sessions/LIST_REQUEST',
  LIST_SUCCESS = '@sessions/LIST_SUCCESS',
  LIST_FAILURE = '@sessions/LIST_FAILURE',

  CREATE_REQUEST = '@sessions/CREATE_REQUEST',
  CREATE_SUCCESS = '@sessions/CREATE_SUCCESS',
  CREATE_FAILURE = '@sessions/CREATE_FAILURE',

  GET_BY_ID_REQUEST = '@sessions/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@sessions/GET_BY_ID_SUCCESS',
  GET_BY_ID_FAILURE = '@sessions/GET_BY_ID_FAILURE',
}

export enum SessionsTypes {
  APPEND_ON_LIST = '@sessions/APPEND_ON_LIST'
}

export type ListSessionsState = RequestState<Session>;
export type GetSessionState = RequestState;
export type CreateSessionState = RequestState;
