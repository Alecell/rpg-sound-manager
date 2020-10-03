import { UrlParamsAsObj } from 'interfaces/urlParams';
import { Campaign, ListCampaignsState } from '../types';

export type CampaignGetByIdRequestAction = UrlParamsAsObj;

export interface CampaignListSuccessAction {
  campaignList: ListCampaignsState['data'];
}

export interface CampaignListAppendAction {
  campaign: Campaign;
}

export interface CampaignCreateRequestAction {
  campaignName: Campaign['name'];
}
