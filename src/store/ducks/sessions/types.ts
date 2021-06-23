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
  CREATE_REQUEST = '@sessions/CREATE_REQUEST',
  CREATE_SUCCESS = '@sessions/CREATE_SUCCESS',
  CREATE_FAILURE = '@sessions/CREATE_FAILURE',
}

export type ListSessionsState = RequestState<Session & SessionCollection>;
export type GetSessionState = RequestState;
export type CreateSessionState = RequestState;
