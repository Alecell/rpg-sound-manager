import { EFirestoreCollections } from 'enums/firestoreCollections';
import { CampaignsState } from './ducks/campaigns/types';

export interface IRootState {
  [EFirestoreCollections.CAMPAIGNS]: CampaignsState;
}
