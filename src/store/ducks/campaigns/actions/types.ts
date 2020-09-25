import { Campaign, ListCampaignsState } from '../types';

export interface CampaignListSuccessAction {
  campaignList: ListCampaignsState['data'];
}

export interface CampaignListAppendAction {
  campaign: Campaign;
}

export interface CampaignCreateRequestAction {
  campaignName: Campaign['name'];
}

export interface CampaignGetByIdRequestAction {
  campaignId: Campaign['id'];
}
