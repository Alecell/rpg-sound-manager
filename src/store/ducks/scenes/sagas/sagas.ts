import {
  call, put, take, fork, select, all,
} from 'typed-redux-saga';
import isEmpty from 'lodash.isempty';

import { RootState } from 'interfaces/rootState';
import { UrlParams } from 'interfaces/urlParams';
import { SceneService } from 'services/api/scene/scene';
import { SceneActions } from '../actions';
import { SceneRequestTypes, Scene, ListScenesState } from '../types';
import { ListSceneRequestAction, CreateSceneRequestAction, GetByIdSceneRequestAction } from './types';

export function* listScenes(
  urlParams: UrlParams,
) {
  try {
    const scenes = yield* call(SceneService.list, urlParams);

    yield put(SceneActions.list.success({
      sceneList: scenes as ListScenesState['data'],
    }));
  } catch (err) {
    yield put(SceneActions.list.failure());
  }
}

export function* createScene(
  urlParams: UrlParams,
  sceneName: Scene['name'],
) {
  try {
    yield call(SceneService.create, urlParams, sceneName);
    yield call(listScenes, urlParams);

    yield put(SceneActions.create.success());
  } catch (err) {
    yield put(SceneActions.create.failure());
  }
}

export function* getByIdScene(
  urlParams: UrlParams,
) {
  try {
    const scene = yield* call(SceneService.getById, urlParams);

    yield put(SceneActions.list.append({ scene: scene as Scene }));
    yield put(SceneActions.getById.success());
  } catch (err) {
    yield put(SceneActions.getById.failure());
  }
}

/**
 * WATCHERS
 */

export function* watchListScenes() {
  while (true) {
    const scenes = yield* select((state: RootState) => state.scenes.list.data);
    const { payload } = yield* take<ListSceneRequestAction>(
      SceneRequestTypes.LIST_REQUEST,
    );
    if (isEmpty(scenes)) {
      yield fork(listScenes, payload.urlParams);
    }
  }
}

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

export function* watchGetByIdScene() {
  while (true) {
    const { payload } = yield* take<GetByIdSceneRequestAction>(
      SceneRequestTypes.GET_BY_ID_REQUEST,
    );

    yield fork(getByIdScene, payload.urlParams);
  }
}

export function* sceneWatcher() {
  return yield all([
    fork(watchListScenes),
    fork(watchCreateScene),
    fork(watchGetByIdScene),
  ]);
}
