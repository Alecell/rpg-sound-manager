import { UrlParamsAsObj } from 'interfaces/urlParams';
import { Session, ListSessionsState, SessionCollection } from '../types';

export type SessionListRequestAction = UrlParamsAsObj;
export type SessionGetByIdRequestAction = UrlParamsAsObj;

export interface SessionListSuccessAction {
  sessionList: ListSessionsState['data'];
}

export interface SessionListAppendAction {
  session: Session & SessionCollection;
}

export interface SessionCreateRequestAction extends UrlParamsAsObj {
  sessionName: Session['name'];
}
