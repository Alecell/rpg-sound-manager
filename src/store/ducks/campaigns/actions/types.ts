import { EmptyObject } from 'types/emptyObject';
import { ICampaign, ListCampaignsState } from '../types';

export type CampaignListSuccessAction = ListCampaignsState['data'] | EmptyObject;
export type CampaignListAppendAction = ICampaign | EmptyObject;

export interface CampaignCreateRequestAction {
  campaignName: ICampaign['name'];
}

export interface CampaignGetByIdRequestAction {
  campaignId: ICampaign['id'];
}
