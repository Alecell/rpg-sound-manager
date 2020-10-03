import { Campaign } from '../../campaigns/types';
import { Session } from '../../sessions/types';
import { Scene } from '../../scenes/types';
import { Mix, ListMixesState } from '../types';

export interface MixListSuccessAction {
  mixList: ListMixesState['data'];
}

export interface MixListRequestAction {
  campaignId: Campaign['id'];
  sessionId: Session['id'];
  sceneId: Scene['id'];
}

export interface MixListAppendAction {
  mix: Mix;
}

export interface MixCreateRequestAction {
  campaignId: Campaign['id'];
  sessionId: Session['id'];
  sceneId: Scene['id'];
  mixName: Mix['name'];
}

export interface MixGetByIdRequestAction {
  campaignId: Campaign['id'];
  sessionId: Session['id'];
  sceneId: Scene['id'];
  mixId: Mix['id'];
}
