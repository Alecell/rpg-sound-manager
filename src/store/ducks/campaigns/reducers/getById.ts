import { Action, createReducer } from 'typesafe-actions';

import { GetCampaignState } from '../types';
import { CampaignActions } from '../actions';

export const INITIAL_STATE: GetCampaignState = {
  loading: false,
  error: false,
};

export const getById = createReducer<GetCampaignState, Action>(INITIAL_STATE)
  .handleAction(CampaignActions.getById.request, () => ({
    loading: true,
    error: false,
  }))
  .handleAction(CampaignActions.getById.success, () => ({
    loading: false,
    error: false,
  }))
  .handleAction(CampaignActions.getById.failure, () => ({
    loading: false,
    error: true,
  }));
