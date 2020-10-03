import { Action, createReducer } from 'typesafe-actions';

import { MixActions } from '../actions';
import { ListMixesState } from '../types';

export const INITIAL_STATE: ListMixesState = {
  data: {},
  loading: false,
  error: false,
};

export const list = createReducer<ListMixesState, Action>(INITIAL_STATE)
  .handleAction(MixActions.list.request, (store) => ({
    ...store,
    loading: true,
    error: false,
  }))
  .handleAction(MixActions.list.success, (store, action) => ({
    data: action.payload.mixList,
    loading: false,
    error: false,
  }))
  .handleAction(MixActions.list.failure, () => ({
    data: {},
    loading: false,
    error: true,
  }))
  .handleAction(MixActions.list.append, (store, action) => ({
    ...store,
    data: {
      ...store.data,
      [action.payload.mix.id]: action.payload.mix,
    },
  }));
