import { combineReducers } from 'redux';

import { list } from './list';

export const sessionsReducer = combineReducers({
  list,
});
