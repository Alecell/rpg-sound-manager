import { IRequestState } from '../types';

interface ICampaign {
  id: string;
  name: string;
}

export enum CampaignsRequestTypes {
  LOAD_REQUEST = '@campaigns/LOAD_REQUEST',
  LOAD_SUCCESS = '@campaigns/LOAD_SUCCESS',
  LOAD_FAILURE = '@campaigns/LOAD_FAILURE',
}

export enum CampaignsTypes {
  UPDATE_VIEWING_CAMPAIGN = 'UPDATE_VIEWING_CAMPAIGN',
}

export type CampaignsState = IRequestState<ICampaign>;
