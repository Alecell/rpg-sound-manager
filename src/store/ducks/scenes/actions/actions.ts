import { createAction, createAsyncAction } from 'typesafe-actions';

import { SceneRequestTypes, SceneTypes } from '../types';
import {
  SceneListRequestAction,
  SceneListSuccessAction,
  SceneListAppendAction,
  SceneCreateRequestAction,
  SceneGetByIdRequestAction,
} from './types';

export class SceneActions {
  static readonly list = {
    append: createAction(SceneTypes.APPEND_ON_LIST)<SceneListAppendAction>(),
    ...createAsyncAction(
      [SceneRequestTypes.LIST_REQUEST, (res: SceneListRequestAction) => res],
      [SceneRequestTypes.LIST_SUCCESS, (res: SceneListSuccessAction) => res],
      SceneRequestTypes.LIST_FAILURE,
    )(),
  } as const;

  static readonly create = createAsyncAction(
    [SceneRequestTypes.CREATE_REQUEST, (res: SceneCreateRequestAction) => res],
    SceneRequestTypes.CREATE_SUCCESS,
    SceneRequestTypes.CREATE_FAILURE,
  )();

  static readonly getById = createAsyncAction(
    [SceneRequestTypes.GET_BY_ID_REQUEST, (res: SceneGetByIdRequestAction) => res],
    SceneRequestTypes.GET_BY_ID_SUCCESS,
    SceneRequestTypes.GET_BY_ID_FAILURE,
  )();
}
