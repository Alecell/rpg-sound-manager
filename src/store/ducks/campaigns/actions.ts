import { action } from 'typesafe-actions';
import Role from 'lance';
import { CampaignsRequestTypes, CampaignsState } from './types';

export class CampaignActions {
  static readonly loadList = {
    request: () => action(CampaignsRequestTypes.LOAD_REQUEST),
    success: (data: CampaignsState['data'] = {}) => action(CampaignsRequestTypes.LOAD_SUCCESS, data),
    failure: () => action(CampaignsRequestTypes.LOAD_FAILURE),
  } as const;
}
