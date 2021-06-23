import { UrlParamsAsObj } from 'interfaces/urlParams';
import { Session } from '../types';

export interface SessionCreateRequestAction extends UrlParamsAsObj {
  sessionName: Session['name'];
}
