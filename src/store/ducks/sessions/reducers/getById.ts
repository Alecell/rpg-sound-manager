import { Action, createReducer } from 'typesafe-actions';

import { GetSessionState } from '../types';
import { SessionActions } from '../actions';

export const INITIAL_STATE: GetSessionState = {
  loading: false,
  error: false,
};

export const getById = createReducer<GetSessionState, Action>(INITIAL_STATE)
  .handleAction(SessionActions.getById.request, () => ({
    loading: true,
    error: false,
  }))
  .handleAction(SessionActions.getById.success, () => ({
    loading: false,
    error: false,
  }))
  .handleAction(SessionActions.getById.failure, () => ({
    loading: false,
    error: true,
  }));
