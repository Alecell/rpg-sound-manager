import { UrlParamsAsObj } from 'interfaces/urlParams';
import { Campaign, CampaignCollection, ListCampaignsState } from '../types';

export type CampaignGetByIdRequestAction = UrlParamsAsObj;

export interface CampaignListSuccessAction {
  campaignList: ListCampaignsState['data'];
}

export interface CampaignListAppendAction {
  campaign: Campaign & CampaignCollection;
}

export interface CampaignCreateRequestAction {
  campaignName: Campaign['name'];
}
