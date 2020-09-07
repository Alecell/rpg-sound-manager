import { Reducer } from 'redux';
import { ListCampaignsState, CampaignsRequestTypes, CampaignsTypes } from '../types';

export const INITIAL_STATE: ListCampaignsState = {
  data: {},
  loading: false,
  error: false,
};

export const list: Reducer<ListCampaignsState> = (store = INITIAL_STATE, action) => {
  if (action.type === CampaignsRequestTypes.LIST_REQUEST) {
    return {
      ...store,
      loading: true,
      error: false,
    };
  }

  if (action.type === CampaignsRequestTypes.LIST_SUCCESS) {
    return {
      ...store,
      data: action.payload,
      loading: false,
      error: false,
    };
  }

  if (action.type === CampaignsRequestTypes.LIST_FAILURE) {
    return {
      ...store,
      data: {},
      loading: false,
      error: true,
    };
  }

  if (action.type === CampaignsTypes.APPEND_ON_LIST) {
    return {
      ...store,
      data: {
        ...store.data,
        [action.payload.campaign.id]: action.payload.campaign,
      },
    };
  }

  return store;
};
