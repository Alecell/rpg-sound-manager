import {
  call, put, take, fork, all, takeLatest,
} from 'typed-redux-saga';
import { v4 as uuid } from 'uuid';

import { UrlParams } from 'interfaces/urlParams';
import { SoundService } from 'services/sound/sound';
import { SoundService as SoundServiceApi } from 'services/api/sound/sound';
import { queryClient } from 'config/query';
import { EReactQueryKeys } from 'enums/reactQueryKeys';
import { SoundActions } from '../actions/actions';
import { Sound, SoundRequestTypes } from '../types';
import {
  CreateSoundRequestAction,
  SetConfigSoundRequestAction,
  DeleteSoundRequestAction,
} from './types';

function* reListSounds(urlParams: UrlParams) {
  yield* call(
    [queryClient, queryClient.refetchQueries],
    [EReactQueryKeys.LIST_SOUND, urlParams.sceneId, urlParams.mixId],
    { active: true, exact: true },
  );
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
      yield* call(SoundServiceApi.create, urlParams, soundName, `${soundUrl.href}`, duration);
      yield* reListSounds(urlParams);
    } else {
      throw new Error('Falha no upload');
    }

    yield* put(SoundActions.create.success());
  } catch (err) {
    yield* put(SoundActions.create.failure());
  }
}

export function* deleteSound(
  urlParams: UrlParams,
  soundId: Sound['id'],
  soundUrl: Sound['url'],
) {
  try {
    yield* call(SoundServiceApi.delete, urlParams, soundId);
    yield* call(SoundServiceApi.deleteFromBucket, soundUrl);

    yield* reListSounds(urlParams);

    yield put(SoundActions.delete.success());
  } catch (err) {
    yield put(SoundActions.delete.failure());
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

export function* watchDelete() {
  while (true) {
    const { payload } = yield* take<DeleteSoundRequestAction>(
      SoundRequestTypes.DELETE_REQUEST,
    );

    yield fork(
      deleteSound,
      payload.urlParams,
      payload.soundId,
      payload.soundUrl,
    );
  }
}

export function* watchSetConfig() {
  while (true) {
    yield takeLatest(SoundActions.setConfig.request, setConfig);
  }
}

export function* soundWatcher() {
  return yield* all([
    fork(watchCreateSound),
    fork(watchDelete),
    fork(watchSetConfig),
  ]);
}
