import {
  call, put, take, fork, select, all,
} from 'typed-redux-saga';
import isEmpty from 'lodash.isempty';

import { RootState } from 'interfaces/rootState';
import { Scene } from 'store/ducks/scenes/types';
import { Session } from 'store/ducks/sessions/types';
import { Campaign } from 'store/ducks/campaigns/types';
import { SoundService } from 'services/api/sound';
import { SoundActions } from '../actions';
import { SoundRequestTypes, Sound, ListSoundsState } from '../types';
import { ListSoundRequestAction, CreateSoundRequestAction } from './types';

export function* listSounds(
  campaignId: Campaign['id'],
  sessionId: Session['id'],
  sceneId: Scene['id'],
) {
  try {
    const sounds = yield* call(SoundService.list, campaignId, sessionId, sceneId);

    yield put(SoundActions.list.success({
      soundList: sounds as ListSoundsState['data'],
    }));
  } catch (err) {
    yield put(SoundActions.list.failure());
  }
}

export function* createSound(
  campaignId: Campaign['id'],
  sessionId: Session['id'],
  sceneId: Scene['id'],
  soundName: Sound['name'],
) {
  try {
    yield call(SoundService.create, campaignId, sessionId, sceneId, soundName);
    yield call(listSounds, campaignId, sessionId, sceneId);

    yield put(SoundActions.create.success());
  } catch (err) {
    yield put(SoundActions.create.failure());
  }
}

/**
 * WATCHERS
 */

export function* watchListSound() {
  while (true) {
    const sounds = yield* select((state: RootState) => state.sounds.list.data);
    const { payload } = yield* take<ListSoundRequestAction>(
      SoundRequestTypes.LIST_REQUEST,
    );
    if (isEmpty(sounds)) {
      yield fork(listSounds, payload.campaignId, payload.sessionId, payload.sceneId);
    }
  }
}

export function* watchCreateSound() {
  while (true) {
    const { payload } = yield* take<CreateSoundRequestAction>(
      SoundRequestTypes.CREATE_REQUEST,
    );
    yield fork(
      createSound,
      payload.campaignId,
      payload.sessionId,
      payload.sceneId,
      payload.soundName,
    );
  }
}

export function* soundWatcher() {
  return yield all([
    fork(watchListSound),
    fork(watchCreateSound),
  ]);
}
