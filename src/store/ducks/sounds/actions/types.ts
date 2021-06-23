import { UrlParamsAsObj } from 'interfaces/urlParams';
import { Sound, SoundConfig } from '../types';

export interface SoundCreateRequestAction extends UrlParamsAsObj {
  soundName: Sound['name'];
  soundFile: File;
}

export interface SoundDeleteRequestAction extends UrlParamsAsObj {
  soundId: Sound['id'];
  soundUrl: Sound['url'];
}

export interface SoundSetConfigRequestAction extends UrlParamsAsObj {
  soundId: Sound['id'];
  config: SoundConfig;
}
