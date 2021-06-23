import { createAsyncAction } from 'typesafe-actions';

import { MixRequestTypes } from '../types';
import { MixCreateRequestAction } from './types';

export class MixActions {
  static readonly create = createAsyncAction(
    [MixRequestTypes.CREATE_REQUEST, (res: MixCreateRequestAction) => res],
    MixRequestTypes.CREATE_SUCCESS,
    MixRequestTypes.CREATE_FAILURE,
  )();
}
