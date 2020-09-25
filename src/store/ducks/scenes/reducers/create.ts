import { Action, createReducer } from 'typesafe-actions';

import { SceneActions } from '../actions';
import { CreateSceneState } from '../types';

export const INITIAL_STATE: CreateSceneState = {
  loading: false,
  error: false,
};

export const create = createReducer<CreateSceneState, Action>(INITIAL_STATE)
  .handleAction(SceneActions.create.request, () => ({
    loading: true,
    error: false,
  }))
  .handleAction(SceneActions.create.success, () => ({
    loading: false,
    error: false,
  }))
  .handleAction(SceneActions.create.failure, () => ({
    loading: false,
    error: true,
  }));
