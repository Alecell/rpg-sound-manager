import { UrlParamsAsObj } from 'interfaces/urlParams';
import { Mix } from '../types';

export type MixPlayAction = UrlParamsAsObj;

export interface MixCreateRequestAction extends UrlParamsAsObj {
  mixName: Mix['name'];
}
