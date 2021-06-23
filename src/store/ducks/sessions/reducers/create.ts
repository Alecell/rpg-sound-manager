import { Action, createReducer } from 'typesafe-actions';

import { SessionActions } from '../actions/actions';
import { CreateSessionState } from '../types';

export const INITIAL_STATE: CreateSessionState = {
  loading: false,
  error: false,
};

export const create = createReducer<CreateSessionState, Action>(INITIAL_STATE)
  .handleAction(SessionActions.create.request, () => ({
    loading: true,
    error: false,
  }))
  .handleAction(SessionActions.create.success, () => ({
    loading: false,
    error: false,
  }))
  .handleAction(SessionActions.create.failure, () => ({
    loading: false,
    error: true,
  }));
