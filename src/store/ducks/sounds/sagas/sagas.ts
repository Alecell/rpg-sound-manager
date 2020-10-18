import {
  call, put, take, fork, all, takeLatest,
} from 'typed-redux-saga';
import { v4 as uuid } from 'uuid';

import { UrlParams } from 'interfaces/urlParams';
import { SoundService } from 'services/sound';
import { SoundService as SoundServiceApi } from 'services/api/sound';
import { ObjectUtil } from 'utils/object/object';
import { SoundActions } from '../actions';
import {
  SoundRequestTypes,
  Sound,
  ListSoundsState,
} from '../types';
import {
  ListSoundRequestAction,
  CreateSoundRequestAction,
  SetConfigSoundRequestAction,
} from './types';
import { SoundListSuccessAction } from '../actions/types';

export function* listSounds(urlParams: UrlParams) {
  try {
    const sounds = (yield* call(SoundServiceApi.list, urlParams)) as ListSoundsState['data'];
    const soundList = ObjectUtil.appendOnEveryChild<
      SoundListSuccessAction['soundList']
    >(sounds, { collectionId: urlParams.mixId || urlParams.sceneId });

    yield put(SoundActions.list.success({ soundList }));
  } catch (err) {
    yield put(SoundActions.list.failure());
  }
}

export function* createSound(
  urlParams: UrlParams,
  soundName: Sound['name'],
  soundFile: File,
) {
  try {
    const soundUrl = yield* call(SoundServiceApi.upload, uuid(), soundFile);

    if (soundUrl) {
      const duration = yield* call(SoundService.getAudioFileDuration, soundFile);
      yield call(SoundServiceApi.create, urlParams, soundName, `${soundUrl.href}`, duration);
    } else {
      throw new Error('Falha no upload');
    }
    yield call(listSounds, urlParams);
    yield put(SoundActions.create.success());
  } catch (err) {
    yield put(SoundActions.create.failure());
  }
}

export function* setConfig({ payload }: SetConfigSoundRequestAction) {
  try {
    yield* call(SoundServiceApi.updateConfig, payload.urlParams, payload.soundId, payload.config);

    yield put(SoundActions.setConfig.success());
  } catch (err) {
    yield put(SoundActions.setConfig.failure());
  }
}

/**
 * WATCHERS
 */

export function* watchListSound() {
  while (true) {
    const { payload } = yield* take<ListSoundRequestAction>(
      SoundRequestTypes.LIST_REQUEST,
    );

    yield fork(listSounds, payload.urlParams);
  }
}

export function* watchCreateSound() {
  while (true) {
    const { payload } = yield* take<CreateSoundRequestAction>(
      SoundRequestTypes.CREATE_REQUEST,
    );
    yield fork(
      createSound,
      payload.urlParams,
      payload.soundName,
      payload.soundFile,
    );
  }
}

export function* watchSetConfig() {
  while (true) {
    yield takeLatest(SoundActions.setConfig.request, setConfig);
  }
}

export function* soundWatcher() {
  return yield all([
    fork(watchListSound),
    fork(watchCreateSound),
    fork(watchSetConfig),
  ]);
}
