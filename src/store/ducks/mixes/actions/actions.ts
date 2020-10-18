import { createAction, createAsyncAction } from 'typesafe-actions';

import { MixRequestTypes, MixTypes } from '../types';
import {
  MixListRequestAction,
  MixListSuccessAction,
  MixListAppendAction,
  MixCreateRequestAction,
  MixGetByIdRequestAction,
} from './types';

export class MixActions {
  static readonly list = {
    append: createAction(MixTypes.APPEND_ON_LIST)<MixListAppendAction>(),
    ...createAsyncAction(
      [MixRequestTypes.LIST_REQUEST, (res: MixListRequestAction) => res],
      [MixRequestTypes.LIST_SUCCESS, (res: MixListSuccessAction) => res],
      MixRequestTypes.LIST_FAILURE,
      MixRequestTypes.LIST_CANCEL,
    )(),
  } as const;

  static readonly create = createAsyncAction(
    [MixRequestTypes.CREATE_REQUEST, (res: MixCreateRequestAction) => res],
    MixRequestTypes.CREATE_SUCCESS,
    MixRequestTypes.CREATE_FAILURE,
  )();

  static readonly getById = createAsyncAction(
    [MixRequestTypes.GET_BY_ID_REQUEST, (res: MixGetByIdRequestAction) => res],
    MixRequestTypes.GET_BY_ID_SUCCESS,
    MixRequestTypes.GET_BY_ID_FAILURE,
    MixRequestTypes.GET_BY_ID_CANCEL,
  )();
}
