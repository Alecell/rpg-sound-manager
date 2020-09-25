import { Campaign } from '../../campaigns/types';
import { Session, ListSessionsState } from '../types';

export interface SessionListRequestAction {
  campaignId: Campaign['id'];
}

export interface SessionListSuccessAction {
  sessionList: ListSessionsState['data'];
}

export interface SessionListAppendAction {
  session: Session;
}

export interface SessionCreateRequestAction {
  campaignId: Campaign['id'];
  sessionName: Session['name'];
}

export interface SessionGetByIdRequestAction {
  campaignId: Campaign['id'];
  sessionId: Session['id'];
}
