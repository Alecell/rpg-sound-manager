import { Action, createReducer } from 'typesafe-actions';

import { GetMixState } from '../types';
import { MixActions } from '../actions';

export const INITIAL_STATE: GetMixState = {
  loading: false,
  error: false,
};

export const getById = createReducer<GetMixState, Action>(INITIAL_STATE)
  .handleAction(MixActions.getById.request, () => ({
    loading: true,
    error: false,
  }))
  .handleAction(MixActions.getById.success, () => ({
    loading: false,
    error: false,
  }))
  .handleAction(MixActions.getById.failure, () => ({
    loading: false,
    error: true,
  }));
