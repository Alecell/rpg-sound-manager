import { all, fork } from 'redux-saga/effects';

import { campaignWatcher } from './campaigns/sagas';
import { sessionWatcher } from './sessions/sagas';

export function* rootSaga() {
  return yield all([
    fork(campaignWatcher),
    fork(sessionWatcher),
  ]);
}
