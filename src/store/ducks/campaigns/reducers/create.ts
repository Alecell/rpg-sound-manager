import { Reducer } from 'redux';

import { CreateCampaignsState, CampaignsRequestTypes } from '../types';

export const INITIAL_STATE: CreateCampaignsState = {
  loading: false,
  error: false,
};

export const create: Reducer<CreateCampaignsState> = (store = INITIAL_STATE, action) => {
  if (action.type === CampaignsRequestTypes.CREATE_REQUEST) {
    return {
      loading: true,
      error: false,
    };
  }

  if (action.type === CampaignsRequestTypes.CREATE_SUCCESS) {
    return {
      loading: false,
      error: false,
    };
  }

  if (action.type === CampaignsRequestTypes.CREATE_FAILURE) {
    return {
      loading: false,
      error: true,
    };
  }

  return store;
};
