import { combineReducers } from 'redux';

import { create } from './create';

export const sessionsReducer = combineReducers({
  create,
});
