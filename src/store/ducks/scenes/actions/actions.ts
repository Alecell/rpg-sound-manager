import { createAsyncAction } from 'typesafe-actions';

import { SceneRequestTypes } from '../types';
import { SceneCreateRequestAction } from './types';

export class SceneActions {
  static readonly create = createAsyncAction(
    [SceneRequestTypes.CREATE_REQUEST, (res: SceneCreateRequestAction) => res],
    SceneRequestTypes.CREATE_SUCCESS,
    SceneRequestTypes.CREATE_FAILURE,
  )();
}
