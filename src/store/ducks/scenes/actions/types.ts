import { UrlParamsAsObj } from 'interfaces/urlParams';
import { Scene } from '../types';

export interface SceneCreateRequestAction extends UrlParamsAsObj {
  sceneName: Scene['name'];
}
