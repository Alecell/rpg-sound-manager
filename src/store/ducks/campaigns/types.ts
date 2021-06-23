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
  CREATE_REQUEST = '@campaigns/CREATE_REQUEST',
  CREATE_SUCCESS = '@campaigns/CREATE_SUCCESS',
  CREATE_FAILURE = '@campaigns/CREATE_FAILURE',
}

export type ListCampaignsState = RequestState<Campaign & CampaignCollection>;
export type CreateCampaignState = RequestState;
export type GetCampaignState = RequestState;
