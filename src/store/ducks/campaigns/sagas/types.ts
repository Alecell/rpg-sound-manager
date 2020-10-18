import { CampaignActions } from '../actions';
import { Campaign } from '../types';

export interface ICampaignsState extends Campaign {
  userId?: string;
}

export type ListCampaignRequestAction = ReturnType<typeof CampaignActions.list.request>;
export type CreateCampaignRequestAction = ReturnType<typeof CampaignActions.create.request>;
export type GetByIdCampaignRequestAction = ReturnType<typeof CampaignActions.getById.request>;
