import { createAction, createAsyncAction } from 'typesafe-actions';

import {
  CampaignsTypes, CampaignsRequestTypes,
} from '../types';

import {
  CampaignListAppendAction,
  CampaignListSuccessAction,
  CampaignCreateRequestAction,
  CampaignGetByIdRequestAction,
} from './types';

export class CampaignActions {
  static readonly list = {
    append: createAction(CampaignsTypes.APPEND_ON_LIST)<CampaignListAppendAction>(),
    ...createAsyncAction(
      CampaignsRequestTypes.LIST_REQUEST,
      [CampaignsRequestTypes.LIST_SUCCESS, (res: CampaignListSuccessAction) => res],
      CampaignsRequestTypes.LIST_FAILURE,
      CampaignsRequestTypes.LIST_CANCEL,
    )(),
  } as const;

  static readonly create = createAsyncAction(
    [CampaignsRequestTypes.CREATE_REQUEST, (res: CampaignCreateRequestAction) => res],
    CampaignsRequestTypes.CREATE_SUCCESS,
    CampaignsRequestTypes.CREATE_FAILURE,
  )();

  static readonly getById = createAsyncAction(
    [CampaignsRequestTypes.GET_BY_ID_REQUEST, (res: CampaignGetByIdRequestAction) => res],
    CampaignsRequestTypes.GET_BY_ID_SUCCESS,
    CampaignsRequestTypes.GET_BY_ID_FAILURE,
    CampaignsRequestTypes.GET_BY_ID_CANCEL,
  )();
}
