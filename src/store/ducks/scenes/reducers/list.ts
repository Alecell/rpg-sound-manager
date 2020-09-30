import { Action, createReducer } from 'typesafe-actions';

import { SceneActions } from '../actions';
import { ListScenesState } from '../types';

export const INITIAL_STATE: ListScenesState = {
  data: {},
  loading: false,
  error: false,
};

export const list = createReducer<ListScenesState, Action>(INITIAL_STATE)
  .handleAction(SceneActions.list.request, (store) => ({
    ...store,
    loading: true,
    error: false,
  }))
  .handleAction(SceneActions.list.success, (store, action) => ({
    data: action.payload.sceneList,
    loading: false,
    error: false,
  }))
  .handleAction(SceneActions.list.failure, () => ({
    data: {},
    loading: false,
    error: true,
  }))
  .handleAction(SceneActions.list.append, (store, action) => ({
    ...store,
    data: {
      ...store.data,
      [action.payload.scene.id]: action.payload.scene,
    },
  }));
