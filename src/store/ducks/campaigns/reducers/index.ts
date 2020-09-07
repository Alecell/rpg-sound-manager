import { combineReducers } from 'redux';

import { create } from './create';
import { list } from './list';

export const campaignsReducer = combineReducers({
  list,
  create,
});
