import { combineReducers } from 'redux';

import { list } from './list';
import { create } from './create';
import { deleteReducer } from './delete';

export const soundsReducer = combineReducers({
  list,
  create,
  delete: deleteReducer,
});
