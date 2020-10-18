import { UrlParamsAsObj } from 'interfaces/urlParams';
import { Scene, ListScenesState, SceneCollection } from '../types';

export type SceneListRequestAction = UrlParamsAsObj;
export type SceneGetByIdRequestAction = UrlParamsAsObj;

export interface SceneListSuccessAction {
  sceneList: ListScenesState['data'];
}

export interface SceneListAppendAction {
  scene: Scene & SceneCollection;
}

export interface SceneCreateRequestAction extends UrlParamsAsObj {
  sceneName: Scene['name'];
}
