import { RequestState } from '../types';

export interface ICampaign {
  id: string;
  name: string;
}

export enum CampaignsRequestTypes {
  LIST_REQUEST = '@campaigns/LIST_REQUEST',
  LIST_SUCCESS = '@campaigns/LIST_SUCCESS',
  LIST_FAILURE = '@campaigns/LIST_FAILURE',

  CREATE_REQUEST = '@campaigns/CREATE_REQUEST',
  CREATE_SUCCESS = '@campaigns/CREATE_SUCCESS',
  CREATE_FAILURE = '@campaigns/CREATE_FAILURE',
}

export enum CampaignsTypes {
  APPEND_ON_LIST = '@campaign/APPEND_ON_LIST'
}

export type CampaignsState = RequestState<ICampaign>;
export type ListCampaignsState = RequestState<ICampaign>;
export type CreateCampaignsState = RequestState;
