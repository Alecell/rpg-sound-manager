import { Scene } from 'store/ducks/scenes/types';
import { Session } from 'store/ducks/sessions/types';
import { Campaign } from 'store/ducks/campaigns/types';
import { Mix } from 'store/ducks/mixes/types';

export interface UrlParams {
  campaignId: Campaign['id'];
  sessionId: Session['id'];
  sceneId: Scene['id'];
  mixId: Mix['id'];
}
