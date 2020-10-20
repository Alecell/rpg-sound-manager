import { Action, createReducer } from 'typesafe-actions';

import { SoundActions } from '../actions';
import { DeleteSoundState } from '../types';

export const INITIAL_STATE: DeleteSoundState = {
  loading: false,
  error: false,
};

//  Should be `deleteReducer` since the `delete` keyword is a reserved word
export const deleteReducer = createReducer<DeleteSoundState, Action>(INITIAL_STATE)
  .handleAction(SoundActions.list.request, () => ({
    loading: true,
    error: false,
  }))
  .handleAction(SoundActions.list.success, () => ({
    loading: false,
    error: false,
  }))
  .handleAction(SoundActions.list.failure, () => ({
    loading: false,
    error: true,
  }));
