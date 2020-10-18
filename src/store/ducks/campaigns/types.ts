import { IUser } from 'interfaces/user';
import { RequestState } from '../types';

export interface CampaignCollection {
  userId?: IUser['id'];
}

export interface Campaign {
  id: string;
  name: string;
}

export enum CampaignsRequestTypes {
  LIST_REQUEST = '@campaigns/LIST_REQUEST',
  LIST_SUCCESS = '@campaigns/LIST_SUCCESS',
  LIST_FAILURE = '@campaigns/LIST_FAILURE',
  LIST_CANCEL = '@campaigns/LIST_CANCEL',

  CREATE_REQUEST = '@campaigns/CREATE_REQUEST',
  CREATE_SUCCESS = '@campaigns/CREATE_SUCCESS',
  CREATE_FAILURE = '@campaigns/CREATE_FAILURE',

  GET_BY_ID_REQUEST = '@campaigns/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@campaigns/GET_BY_ID_SUCCESS',
  GET_BY_ID_FAILURE = '@campaigns/GET_BY_ID_FAILURE',
  GET_BY_ID_CANCEL = '@campaigns/GET_BY_ID_CANCEL',
}

export enum CampaignsTypes {
  APPEND_ON_LIST = '@campaigns/APPEND_ON_LIST'
}

export type ListCampaignsState = RequestState<Campaign & CampaignCollection>;
export type CreateCampaignState = RequestState;
export type GetCampaignState = RequestState;
