import { createAsyncAction } from 'typesafe-actions';

import { SoundRequestTypes } from '../types';
import {
  SoundCreateRequestAction,
  SoundDeleteRequestAction,
  SoundSetConfigRequestAction,
} from './types';

export class SoundActions {
  static readonly create = createAsyncAction(
    [SoundRequestTypes.CREATE_REQUEST, (res: SoundCreateRequestAction) => res],
    SoundRequestTypes.CREATE_SUCCESS,
    SoundRequestTypes.CREATE_FAILURE,
  )();

  static readonly delete = createAsyncAction(
    [SoundRequestTypes.DELETE_REQUEST, (res: SoundDeleteRequestAction) => res],
    SoundRequestTypes.DELETE_SUCCESS,
    SoundRequestTypes.DELETE_FAILURE,
  )();

  static readonly setConfig = createAsyncAction(
    [SoundRequestTypes.SET_CONFIG_REQUEST, (res: SoundSetConfigRequestAction) => res],
    SoundRequestTypes.SET_CONFIG_SUCCESS,
    SoundRequestTypes.SET_CONFIG_FAILURE,
  )();
}
