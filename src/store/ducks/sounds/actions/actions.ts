import { createAsyncAction } from 'typesafe-actions';

import { SoundRequestTypes } from '../types';
import {
  SoundListRequestAction,
  SoundListSuccessAction,
  SoundCreateRequestAction,
  SoundSetConfigRequestAction,
} from './types';

export class SoundActions {
  static readonly list = createAsyncAction(
    [SoundRequestTypes.LIST_REQUEST, (res: SoundListRequestAction) => res],
    [SoundRequestTypes.LIST_SUCCESS, (res: SoundListSuccessAction) => res],
    SoundRequestTypes.LIST_FAILURE,
  )();

  static readonly create = createAsyncAction(
    [SoundRequestTypes.CREATE_REQUEST, (res: SoundCreateRequestAction) => res],
    SoundRequestTypes.CREATE_SUCCESS,
    SoundRequestTypes.CREATE_FAILURE,
  )();

  static readonly setConfig = createAsyncAction(
    [SoundRequestTypes.SET_CONFIG_REQUEST, (res: SoundSetConfigRequestAction) => res],
    SoundRequestTypes.SET_CONFIG_SUCCESS,
    SoundRequestTypes.SET_CONFIG_FAILURE,
  )();
}
