import { UrlParamsAsObj } from 'interfaces/urlParams';
import { Mix, ListMixesState } from '../types';

export type MixListRequestAction = UrlParamsAsObj;
export type MixGetByIdRequestAction = UrlParamsAsObj;

export interface MixListSuccessAction {
  mixList: ListMixesState['data'];
}

export interface MixListAppendAction {
  mix: Mix;
}

export interface MixCreateRequestAction extends UrlParamsAsObj {
  mixName: Mix['name'];
}
