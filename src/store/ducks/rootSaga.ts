import { all, takeLatest } from 'redux-saga/effects';

import { loadCampaigns } from './campaigns/sagas';
import { CampaignsRequestTypes } from './campaigns/types';

export function* rootSaga() {
  return yield all([
    takeLatest(CampaignsRequestTypes.LOAD_REQUEST, loadCampaigns),
  ]);
}
