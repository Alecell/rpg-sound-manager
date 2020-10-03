import { UrlParams, UrlParamsAsObj } from 'interfaces/urlParams';
import { Scene, ListScenesState } from '../types';

export type SceneListRequestAction = UrlParamsAsObj;
export type SceneGetByIdRequestAction = UrlParamsAsObj;

export interface SceneListSuccessAction {
  sceneList: ListScenesState['data'];
}

export interface SceneListAppendAction {
  scene: Scene;
}

export interface SceneCreateRequestAction extends UrlParamsAsObj {
  sceneName: Scene['name'];
}
