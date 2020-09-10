import { action } from 'typesafe-actions';

import { EmptyObject } from 'types/emptyObject';
import {
  CampaignsRequestTypes,
  ICampaign,
  ListCampaignsState,
  CampaignsTypes,
} from './types';

export class CampaignActions {
  static readonly list = {
    request: () => action(CampaignsRequestTypes.LIST_REQUEST),
    success: (data: ListCampaignsState['data'] | EmptyObject) => action(
      CampaignsRequestTypes.LIST_SUCCESS, data,
    ),
    failure: () => action(CampaignsRequestTypes.LIST_FAILURE),
    append: (campaign: ICampaign | EmptyObject) => action(
      CampaignsTypes.APPEND_ON_LIST, { campaign },
    ),
  } as const;

  static readonly create = {
    request: (campaignName: ICampaign['name']) => action(
      CampaignsRequestTypes.CREATE_REQUEST, { campaignName },
    ),
    success: () => action(CampaignsRequestTypes.CREATE_SUCCESS),
    failure: () => action(CampaignsRequestTypes.CREATE_FAILURE),
  } as const;

  static readonly getById = {
    request: (campaignId: ICampaign['id']) => action(
      CampaignsRequestTypes.GET_BY_ID_REQUEST, { campaignId },
    ),
    success: () => action(CampaignsRequestTypes.GET_BY_ID_SUCCESS),
    failure: () => action(CampaignsRequestTypes.GET_BY_ID_FAILURE),
  } as const;
}
