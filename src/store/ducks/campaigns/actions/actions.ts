import { createAsyncAction } from 'typesafe-actions';

import { CampaignsRequestTypes } from '../types';

import { CampaignCreateRequestAction } from './types';

export class CampaignActions {
  static readonly create = createAsyncAction(
    [CampaignsRequestTypes.CREATE_REQUEST, (res: CampaignCreateRequestAction) => res],
    CampaignsRequestTypes.CREATE_SUCCESS,
    CampaignsRequestTypes.CREATE_FAILURE,
  )();
}
