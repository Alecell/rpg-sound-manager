import { createAction } from 'typesafe-actions';

import { SessionsRequestTypes } from '../types';
import {
  SessionCreateRequestAction,
  SessionListRequestAction,
  SessionListSuccessAction,
} from './types';

export class SessionActions {
  static readonly list = {
    request: createAction(SessionsRequestTypes.LIST_REQUEST)<SessionListRequestAction>(),
    success: createAction(SessionsRequestTypes.LIST_SUCCESS)<SessionListSuccessAction>(),
    failure: createAction(SessionsRequestTypes.LIST_FAILURE)(),
  } as const;

  static readonly create = {
    request: createAction(SessionsRequestTypes.CREATE_REQUEST)<SessionCreateRequestAction>(),
    success: createAction(SessionsRequestTypes.CREATE_SUCCESS)(),
    failure: createAction(SessionsRequestTypes.CREATE_FAILURE)(),
  } as const;
}
