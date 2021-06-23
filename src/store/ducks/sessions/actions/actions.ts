import { createAsyncAction } from 'typesafe-actions';

import { SessionsRequestTypes } from '../types';
import {
  SessionCreateRequestAction,
} from './types';

export class SessionActions {
  static readonly create = createAsyncAction(
    [SessionsRequestTypes.CREATE_REQUEST, (res: SessionCreateRequestAction) => res],
    SessionsRequestTypes.CREATE_SUCCESS,
    SessionsRequestTypes.CREATE_FAILURE,
  )();
}
