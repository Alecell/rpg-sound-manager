import { Action, createReducer } from 'typesafe-actions';

import { CampaignActions } from '../actions';
import { ListCampaignsState } from '../types';

export const INITIAL_STATE: ListCampaignsState = {
  data: {},
  loading: false,
  error: false,
};

export const list = createReducer<ListCampaignsState, Action>(INITIAL_STATE)
  .handleAction(CampaignActions.list.request, (store) => ({
    ...store,
    loading: true,
    error: false,
  }))
  .handleAction(CampaignActions.list.success, (store, action) => ({
    data: {
      ...store.data,
      ...action.payload.campaignList,
    },
    loading: false,
    error: false,
  }))
  .handleAction(CampaignActions.list.failure, (store) => ({
    ...store,
    loading: false,
    error: true,
  }))
  .handleAction(CampaignActions.list.append, (store, action) => ({
    ...store,
    data: {
      ...store.data,
      [action.payload.campaign.id]: action.payload.campaign,
    },
  }));
