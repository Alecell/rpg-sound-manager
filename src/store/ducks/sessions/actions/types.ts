import { ICampaign } from '../../campaigns/types';
import { ISession, ListSessionsState } from '../types';

export type SessionListSuccessAction = ListSessionsState['data'];

export interface SessionListRequestAction {
  campaignId: ICampaign['id'];
}

export interface SessionCreateRequestAction {
  campaignId: ICampaign['id'];
  sessionName: ISession['name'];
}
