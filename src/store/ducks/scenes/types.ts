import { Session } from '../sessions/types';
import { RequestState } from '../types';

export interface SceneCollection {
  sessionId?: Session['id'];
}

export interface Scene {
  id: string;
  name: string;
}

export enum SceneRequestTypes {
  CREATE_REQUEST = '@scene/CREATE_REQUEST',
  CREATE_SUCCESS = '@scene/CREATE_SUCCESS',
  CREATE_FAILURE = '@scene/CREATE_FAILURE',
}

export type ListScenesState = RequestState<Scene & SceneCollection>;
export type CreateSceneState = RequestState;
export type GetSceneState = RequestState;
