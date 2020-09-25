import { Action, createReducer } from 'typesafe-actions';

import { SessionActions } from '../actions';
import { ListSessionsState } from '../types';

export const INITIAL_STATE: ListSessionsState = {
  data: {},
  loading: false,
  error: false,
};

export const list = createReducer<ListSessionsState, Action>(INITIAL_STATE)
  .handleAction(SessionActions.list.request, (store) => ({
    ...store,
    loading: true,
    error: false,
  }))
  .handleAction(SessionActions.list.success, (store, action) => ({
    data: action.payload.sessionList,
    loading: false,
    error: false,
  }))
  .handleAction(SessionActions.list.failure, () => ({
    data: {},
    loading: false,
    error: true,
  }))
  .handleAction(SessionActions.list.append, (store, action) => ({
    ...store,
    data: {
      ...store.data,
      [action.payload.session.id]: action.payload.session,
    },
  }));
