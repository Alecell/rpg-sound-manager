import { Reducer } from 'redux';

import { GetCampaignState, CampaignsRequestTypes } from '../types';

export const INITIAL_STATE: GetCampaignState = {
  loading: false,
  error: false,
};

export const getById: Reducer<GetCampaignState> = (store = INITIAL_STATE, action) => {
  if (action.type === CampaignsRequestTypes.GET_BY_ID_REQUEST) {
    return {
      loading: true,
      error: false,
    };
  }

  if (action.type === CampaignsRequestTypes.GET_BY_ID_SUCCESS) {
    return {
      loading: false,
      error: false,
    };
  }

  if (action.type === CampaignsRequestTypes.GET_BY_ID_FAILURE) {
    return {
      loading: false,
      error: true,
    };
  }

  return store;
};
