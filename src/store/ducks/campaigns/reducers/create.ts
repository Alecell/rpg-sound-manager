import { Action, createReducer } from 'typesafe-actions';

import { CampaignActions } from '../actions';
import { CreateCampaignState } from '../types';

export const INITIAL_STATE: CreateCampaignState = {
  loading: false,
  error: false,
};

export const create = createReducer<CreateCampaignState, Action>(INITIAL_STATE)
  .handleAction(CampaignActions.create.request, () => ({
    loading: true,
    error: false,
  }))
  .handleAction(CampaignActions.create.success, () => ({
    loading: false,
    error: false,
  }))
  .handleAction(CampaignActions.create.failure, () => ({
    loading: false,
    error: true,
  }));
