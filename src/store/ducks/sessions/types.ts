import { RequestState } from '../types';

export interface ISession {
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
}

export type ListSessionsState = RequestState<ISession>;
