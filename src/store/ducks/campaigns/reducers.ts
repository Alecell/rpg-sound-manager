import { Reducer } from 'redux';
import { CampaignsState, CampaignsRequestTypes } from './types';

export const INITIAL_STATE: CampaignsState = {
  data: {},
  loading: false,
  error: false,
};

export const campaignsReducer: Reducer<CampaignsState> = (store = INITIAL_STATE, action) => {
  if (action.type === CampaignsRequestTypes.LOAD_REQUEST) {
    return {
      ...store,
      loading: true,
      error: false,
    };
  }

  if (action.type === CampaignsRequestTypes.LOAD_SUCCESS) {
    return {
      ...store,
      data: action.payload,
      loading: false,
      error: false,
    };
  }

  if (action.type === CampaignsRequestTypes.LOAD_FAILURE) {
    return {
      ...store,
      data: action.payload,
      loading: false,
      error: true,
    };
  }

  return store;
};
