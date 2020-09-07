import { action } from 'typesafe-actions';
import { CampaignsRequestTypes, CampaignsState, ICampaign } from './types';

export class CampaignActions {
  static readonly list = {
    request: () => action(CampaignsRequestTypes.LIST_REQUEST),
    success: (data: CampaignsState['data'] = {}) => action(CampaignsRequestTypes.LIST_SUCCESS, data),
    failure: () => action(CampaignsRequestTypes.LIST_FAILURE),
  } as const;

  static readonly create = {
    request: (campaignName: ICampaign['name']) => action(
      CampaignsRequestTypes.CREATE_REQUEST, { campaignName },
    ),
    success: () => action(CampaignsRequestTypes.CREATE_SUCCESS),
    failure: () => action(CampaignsRequestTypes.CREATE_FAILURE),
  } as const;
}
