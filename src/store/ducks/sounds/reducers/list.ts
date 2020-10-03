import { Action, createReducer } from 'typesafe-actions';

import { SoundActions } from '../actions';
import { ListSoundsState } from '../types';

export const INITIAL_STATE: ListSoundsState = {
  data: {},
  loading: false,
  error: false,
};

export const list = createReducer<ListSoundsState, Action>(INITIAL_STATE)
  .handleAction(SoundActions.list.request, (store) => ({
    ...store,
    loading: true,
    error: false,
  }))
  .handleAction(SoundActions.list.success, (store, action) => ({
    data: {
      ...store.data,
      ...action.payload.soundList,
    },
    loading: false,
    error: false,
  }))
  .handleAction(SoundActions.list.failure, (store) => ({
    ...store,
    loading: false,
    error: true,
  }));
