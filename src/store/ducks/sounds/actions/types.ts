import { Scene } from '../../scenes/types';
import { Session } from '../../sessions/types';
import { Campaign } from '../../campaigns/types';
import { Sound, ListSoundsState } from '../types';

export interface SoundListRequestAction {
  campaignId: Campaign['id'];
  sessionId: Session['id'];
  sceneId: Scene['id'];
}

export interface SoundListSuccessAction {
  soundList: ListSoundsState['data'];
}

export interface SoundCreateRequestAction {
  campaignId: Campaign['id'];
  sessionId: Session['id'];
  sceneId: Scene['id'];
  soundName: Sound['name'];
}

export interface SoundGetByIdRequestAction {
  campaignId: Campaign['id'];
  sessionId: Session['id'];
  soundId: Sound['id'];
}
