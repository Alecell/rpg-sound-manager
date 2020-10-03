import { combineReducers } from 'redux';

import { list } from './list';
import { create } from './create';
import { getById } from './getById';

export const mixesReducer = combineReducers({
  list,
  getById,
  create,
});
