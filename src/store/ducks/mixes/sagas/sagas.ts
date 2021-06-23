import {
  call,
  put,
  take,
  fork,
  all,
} from 'typed-redux-saga';

import { UrlParams } from 'interfaces/urlParams';
import { MixService } from 'services/api/mix/mix';
import { queryClient } from 'config/query';
import { EReactQueryKeys } from 'enums/reactQueryKeys';
import { MixActions } from '../actions/actions';
import { MixRequestTypes, Mix } from '../types';
import { CreateMixRequestAction } from './types';

export function* createMix(
  urlParams: UrlParams,
  mixName: Mix['name'],
) {
  try {
    yield* call(MixService.create, urlParams, mixName);

    yield* call(
      [queryClient, queryClient.refetchQueries],
      [EReactQueryKeys.LIST_MIX, urlParams.sceneId],
      { active: true, exact: true },
    );

    yield* put(MixActions.create.success());
  } catch (err) {
    yield* put(MixActions.create.failure());
  }
}

/**
 * WATCHERS
 */

export function* watchCreateMix() {
  while (true) {
    const { payload } = yield* take<CreateMixRequestAction>(
      MixRequestTypes.CREATE_REQUEST,
    );
    yield fork(
      createMix,
      payload.urlParams,
      payload.mixName,
    );
  }
}

export function* mixWatcher() {
  return yield* all([
    fork(watchCreateMix),
  ]);
}
