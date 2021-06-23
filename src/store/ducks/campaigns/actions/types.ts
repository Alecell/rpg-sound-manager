import { UrlParamsAsObj } from 'interfaces/urlParams';
import { Campaign } from '../types';

export type CampaignGetByIdRequestAction = UrlParamsAsObj;

export interface CampaignCreateRequestAction {
  campaignName: Campaign['name'];
}
