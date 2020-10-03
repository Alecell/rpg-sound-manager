import { all, fork } from 'redux-saga/effects';

import { campaignWatcher } from './campaigns/sagas';
import { sessionWatcher } from './sessions/sagas';
import { sceneWatcher } from './scenes/sagas';
import { mixWatcher } from './mixes/sagas';
import { soundWatcher } from './sounds/sagas';

export function* rootSaga() {
  return yield all([
    fork(campaignWatcher),
    fork(sessionWatcher),
    fork(sceneWatcher),
    fork(mixWatcher),
    fork(soundWatcher),
  ]);
}
