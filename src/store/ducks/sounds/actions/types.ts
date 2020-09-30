import { UrlParams } from 'interfaces/urlParams';
import { Mix } from '../../mixes/types';
import { Scene } from '../../scenes/types';
import { Session } from '../../sessions/types';
import { Campaign } from '../../campaigns/types';
import { Sound, ListSoundsState } from '../types';

export interface SoundListRequestAction {
  urlParams: UrlParams;
}

export interface SoundListSuccessAction {
  soundList: ListSoundsState['data'];
}

export interface SoundCreateRequestAction {
  url: UrlParams;
  soundName: Sound['name'];
  soundFile: File;
}

export interface SoundGetByIdRequestAction {
  campaignId: Campaign['id'];
  sessionId: Session['id'];
  soundId: Sound['id'];
}
