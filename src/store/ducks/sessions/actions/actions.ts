import { createAction, createAsyncAction } from 'typesafe-actions';

import { SessionsRequestTypes, SessionsTypes } from '../types';
import {
  SessionCreateRequestAction,
  SessionGetByIdRequestAction,
  SessionListAppendAction,
  SessionListRequestAction,
  SessionListSuccessAction,
} from './types';

export class SessionActions {
  static readonly list = {
    append: createAction(SessionsTypes.APPEND_ON_LIST)<SessionListAppendAction>(),
    ...createAsyncAction(
      [SessionsRequestTypes.LIST_REQUEST, (res: SessionListRequestAction) => res],
      [SessionsRequestTypes.LIST_SUCCESS, (res: SessionListSuccessAction) => res],
      SessionsRequestTypes.LIST_FAILURE,
      SessionsRequestTypes.LIST_CANCEL,
    )(),
  } as const;

  static readonly create = createAsyncAction(
    [SessionsRequestTypes.CREATE_REQUEST, (res: SessionCreateRequestAction) => res],
    SessionsRequestTypes.CREATE_SUCCESS,
    SessionsRequestTypes.CREATE_FAILURE,
  )();

  static readonly getById = createAsyncAction(
    [SessionsRequestTypes.GET_BY_ID_REQUEST, (res: SessionGetByIdRequestAction) => res],
    SessionsRequestTypes.GET_BY_ID_SUCCESS,
    SessionsRequestTypes.GET_BY_ID_FAILURE,
    SessionsRequestTypes.GET_BY_ID_CANCEL,
  )();
}
