import { UrlParamsAsObj } from 'interfaces/urlParams';
import { Sound, ListSoundsState } from '../types';

export type SoundListRequestAction = UrlParamsAsObj;
export type SoundGetByIdRequestAction = UrlParamsAsObj;

export interface SoundListSuccessAction {
  soundList: ListSoundsState['data'];
}

export interface SoundCreateRequestAction extends UrlParamsAsObj {
  soundName: Sound['name'];
  soundFile: File;
}
