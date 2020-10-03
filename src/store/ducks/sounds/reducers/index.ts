import { combineReducers } from 'redux';

import { list } from './list';
import { create } from './create';

export const soundsReducer = combineReducers({
  list,
  create,
});
