import { createAsyncAction } from 'typesafe-actions';

import { SoundRequestTypes } from '../types';
import {
  SoundListRequestAction,
  SoundListSuccessAction,
  SoundCreateRequestAction,
  SoundGetByIdRequestAction,
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

  static readonly getById = createAsyncAction(
    [SoundRequestTypes.GET_BY_ID_REQUEST, (res: SoundGetByIdRequestAction) => res],
    SoundRequestTypes.GET_BY_ID_SUCCESS,
    SoundRequestTypes.GET_BY_ID_FAILURE,
  )();
}
