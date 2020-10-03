import { RequestState } from '../types';

export interface Scene {
  id: string;
  name: string;
}

export enum SceneRequestTypes {
  LIST_REQUEST = '@scene/LIST_REQUEST',
  LIST_SUCCESS = '@scene/LIST_SUCCESS',
  LIST_FAILURE = '@scene/LIST_FAILURE',

  CREATE_REQUEST = '@scene/CREATE_REQUEST',
  CREATE_SUCCESS = '@scene/CREATE_SUCCESS',
  CREATE_FAILURE = '@scene/CREATE_FAILURE',

  GET_BY_ID_REQUEST = '@scene/GET_BY_ID_REQUEST',
  GET_BY_ID_SUCCESS = '@scene/GET_BY_ID_SUCCESS',
  GET_BY_ID_FAILURE = '@scene/GET_BY_ID_FAILURE',
}

export enum SceneTypes {
  APPEND_ON_LIST = '@scene/APPEND_ON_LIST',
}

export type ListScenesState = RequestState<Scene>;
export type CreateSceneState = RequestState;
export type GetSceneState = RequestState;
