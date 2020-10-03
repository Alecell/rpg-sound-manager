import { Mix } from 'store/ducks/mixes/types';
import { Scene } from 'store/ducks/scenes/types';
import { Sound } from 'store/ducks/sounds/types';
import { Session } from 'store/ducks/sessions/types';
import { Campaign } from 'store/ducks/campaigns/types';

export interface UrlParams {
  campaignId: Campaign['id'];
  sessionId: Session['id'];
  sceneId: Scene['id'];
  mixId: Mix['id'];
  soundId: Sound['id'];
}

export interface UrlParamsAsObj {
  urlParams: UrlParams;
}
