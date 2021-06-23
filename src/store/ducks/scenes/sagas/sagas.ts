import {
  call, put, take, fork, all,
} from 'typed-redux-saga';

import { UrlParams } from 'interfaces/urlParams';
import { SceneService } from 'services/api/scene/scene';
import { queryClient } from 'config/query';
import { EReactQueryKeys } from 'enums/reactQueryKeys';
import { SceneActions } from '../actions/actions';
import { SceneRequestTypes, Scene } from '../types';
import { CreateSceneRequestAction } from './types';

export function* createScene(
  urlParams: UrlParams,
  sceneName: Scene['name'],
) {
  try {
    yield call(SceneService.create, urlParams, sceneName);

    yield* call(
      [queryClient, queryClient.refetchQueries],
      [EReactQueryKeys.LIST_SCENE, urlParams.sessionId],
      { active: true, exact: true },
    );

    yield put(SceneActions.create.success());
  } catch (err) {
    yield put(SceneActions.create.failure());
  }
}

/**
 * WATCHERS
 */

export function* watchCreateScene() {
  while (true) {
    const { payload } = yield* take<CreateSceneRequestAction>(
      SceneRequestTypes.CREATE_REQUEST,
    );
    yield fork(
      createScene,
      payload.urlParams,
      payload.sceneName,
    );
  }
}

export function* sceneWatcher() {
  return yield* all([
    fork(watchCreateScene),
  ]);
}
