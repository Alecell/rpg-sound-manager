import { combineReducers } from 'redux';

import { list } from './list';
import { create } from './create';
import { getById } from './getById';

export const scenesReducer = combineReducers({
  list,
  getById,
  create,
});
