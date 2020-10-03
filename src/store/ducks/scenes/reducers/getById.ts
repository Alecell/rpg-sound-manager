import { Action, createReducer } from 'typesafe-actions';

import { GetSceneState } from '../types';
import { SceneActions } from '../actions';

export const INITIAL_STATE: GetSceneState = {
  loading: false,
  error: false,
};

export const getById = createReducer<GetSceneState, Action>(INITIAL_STATE)
  .handleAction(SceneActions.getById.request, () => ({
    loading: true,
    error: false,
  }))
  .handleAction(SceneActions.getById.success, () => ({
    loading: false,
    error: false,
  }))
  .handleAction(SceneActions.getById.failure, () => ({
    loading: false,
    error: true,
  }));
