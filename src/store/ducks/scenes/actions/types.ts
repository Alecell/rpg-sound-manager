import { Session } from '../../sessions/types';
import { Campaign } from '../../campaigns/types';
import { Scene, ListScenesState } from '../types';

export interface SceneListSuccessAction {
  sceneList: ListScenesState['data'];
}

export interface SceneListRequestAction {
  campaignId: Campaign['id'];
  sessionId: Session['id'];
}

export interface SceneListAppendAction {
  scene: Scene;
}

export interface SceneCreateRequestAction {
  campaignId: Campaign['id'];
  sessionId: Session['id'];
  sceneName: Scene['name'];
}

export interface SceneGetByIdRequestAction {
  campaignId: Campaign['id'];
  sessionId: Session['id'];
  sceneId: Scene['id'];
}
