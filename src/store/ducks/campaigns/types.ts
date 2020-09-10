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

  GET_BY_ID_REQUEST = '@campaigns/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@campaigns/GET_BY_ID_SUCCESS',
  GET_BY_ID_FAILURE = '@campaigns/GET_BY_ID_FAILURE',
}

export enum CampaignsTypes {
  APPEND_ON_LIST = '@campaigns/APPEND_ON_LIST'
}

export type ListCampaignsState = RequestState<ICampaign>;
export type CreateCampaignState = RequestState;
export type GetCampaignState = RequestState;
