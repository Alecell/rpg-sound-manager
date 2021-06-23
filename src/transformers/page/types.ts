import { ListScenesState, Scene } from 'store/ducks/scenes/types';
import { ListSessionsState, Session } from 'store/ducks/sessions/types';
import { Campaign, ListCampaignsState } from 'store/ducks/campaigns/types';
import { ListMixesState } from 'store/ducks/mixes/types';
import { ListSoundsState } from 'store/ducks/sounds/types';

export type TListState =
  ListCampaignsState['data']
  | ListSessionsState['data']
  | ListScenesState['data']
  | ListMixesState['data']
  | ListSoundsState['data'];
export type TGetState = Campaign | Session | Scene;
