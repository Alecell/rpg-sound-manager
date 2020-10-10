import { UrlParamsAsObj } from 'interfaces/urlParams';
import { Sound, ListSoundsState, SoundConfig } from '../types';

export type SoundListRequestAction = UrlParamsAsObj;

export interface SoundListSuccessAction {
  soundList: ListSoundsState['data'];
}

export interface SoundCreateRequestAction extends UrlParamsAsObj {
  soundName: Sound['name'];
  soundFile: File;
}

export interface SoundSetConfigRequestAction extends UrlParamsAsObj {
  soundId: Sound['id'];
  config: SoundConfig;
}
