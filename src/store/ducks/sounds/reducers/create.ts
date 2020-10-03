import { Action, createReducer } from 'typesafe-actions';

import { SoundActions } from '../actions';
import { CreateSoundState } from '../types';

export const INITIAL_STATE: CreateSoundState = {
  loading: false,
  error: false,
};

export const create = createReducer<CreateSoundState, Action>(INITIAL_STATE)
  .handleAction(SoundActions.create.request, () => ({
    loading: true,
    error: false,
  }))
  .handleAction(SoundActions.create.success, () => ({
    loading: false,
    error: false,
  }))
  .handleAction(SoundActions.create.failure, () => ({
    loading: false,
    error: true,
  }));
