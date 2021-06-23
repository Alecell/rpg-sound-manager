import { CampaignActions } from '../actions/actions';
import { Campaign } from '../types';

export interface ICampaignsState extends Campaign {
  userId?: string;
}

export type CreateCampaignRequestAction = ReturnType<typeof CampaignActions.create.request>;
