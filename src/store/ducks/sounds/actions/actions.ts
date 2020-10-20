import { createAction, createAsyncAction } from 'typesafe-actions';

import { SoundRequestTypes, SoundTypes } from '../types';
import {
  SoundListRequestAction,
  SoundListSuccessAction,
  SoundCreateRequestAction,
  SoundDeleteRequestAction,
  SoundSetConfigRequestAction,
  SoundListDeleteAction,
} from './types';

export class SoundActions {
  static readonly list = {
    replace: createAction(SoundTypes.REPLACE)<SoundListDeleteAction>(),
    ...createAsyncAction(
      [SoundRequestTypes.LIST_REQUEST, (res: SoundListRequestAction) => res],
      [SoundRequestTypes.LIST_SUCCESS, (res: SoundListSuccessAction) => res],
      SoundRequestTypes.LIST_FAILURE,
    )(),
  };

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
