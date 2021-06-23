import { all, fork } from 'typed-redux-saga';

import { campaignWatcher } from './campaigns/sagas/sagas';
import { sessionWatcher } from './sessions/sagas/sagas';
import { sceneWatcher } from './scenes/sagas/sagas';
import { mixWatcher } from './mixes/sagas/sagas';
import { soundWatcher } from './sounds/sagas/sagas';

export function* rootSaga() {
  return yield* all([
    fork(campaignWatcher),
    fork(sessionWatcher),
    fork(sceneWatcher),
    fork(mixWatcher),
    fork(soundWatcher),
  ]);
}
