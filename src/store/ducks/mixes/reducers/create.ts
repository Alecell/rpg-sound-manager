import { Action, createReducer } from 'typesafe-actions';

import { MixActions } from '../actions';
import { CreateMixState } from '../types';

export const INITIAL_STATE: CreateMixState = {
  loading: false,
  error: false,
};

export const create = createReducer<CreateMixState, Action>(INITIAL_STATE)
  .handleAction(MixActions.create.request, () => ({
    loading: true,
    error: false,
  }))
  .handleAction(MixActions.create.success, () => ({
    loading: false,
    error: false,
  }))
  .handleAction(MixActions.create.failure, () => ({
    loading: false,
    error: true,
  }));
