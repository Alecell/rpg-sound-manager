import { combineReducers } from 'redux';

import { list } from './list';
import { getById } from './getById';
import { create } from './create';

export const campaignsReducer = combineReducers({
  list,
  getById,
  create,
});
