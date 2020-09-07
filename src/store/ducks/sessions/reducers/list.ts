import { Reducer } from 'redux';

import { ListSessionsState, SessionsRequestTypes } from '../types';

export const INITIAL_STATE: ListSessionsState = {
  data: {},
  loading: false,
  error: false,
};

export const list: Reducer<ListSessionsState> = (store = INITIAL_STATE, action) => {
  if (action.type === SessionsRequestTypes.LIST_REQUEST) {
    return {
      ...store,
      loading: true,
      error: false,
    };
  }

  if (action.type === SessionsRequestTypes.LIST_SUCCESS) {
    return {
      ...store,
      data: action.payload,
      loading: false,
      error: false,
    };
  }

  if (action.type === SessionsRequestTypes.LIST_FAILURE) {
    return {
      ...store,
      data: {},
      loading: false,
      error: true,
    };
  }

  return store;
};
