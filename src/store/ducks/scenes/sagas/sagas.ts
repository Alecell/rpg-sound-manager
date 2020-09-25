import {
  call, put, take, fork, select, all,
} from 'typed-redux-saga';
import isEmpty from 'lodash.isempty';

import { RootState } from 'interfaces/rootState';
import { Session } from 'store/ducks/sessions/types';
import { Campaign } from 'store/ducks/campaigns/types';
import { SceneService } from 'services/api/scene/scene';
import { SceneActions } from '../actions';
import { SceneRequestTypes, Scene, ListScenesState } from '../types';
import { ListSceneRequestAction, CreateSceneRequestAction, GetByIdSceneRequestAction } from './types';

export function* listScenes(
  campaignId: Campaign['id'],
  sessionId: Session['id'],
) {
  try {
    const scenes = yield* call(SceneService.list, campaignId, sessionId);

    yield put(SceneActions.list.success({
      sceneList: scenes as ListScenesState['data'],
    }));
  } catch (err) {
    yield put(SceneActions.list.failure());
  }
}

export function* createScene(
  campaignId: Campaign['id'],
  sessionId: Session['id'],
  sceneName: Scene['name'],
) {
  try {
    yield call(SceneService.create, campaignId, sessionId, sceneName);
    yield call(listScenes, campaignId, sessionId);

    yield put(SceneActions.create.success());
  } catch (err) {
    yield put(SceneActions.create.failure());
  }
}

export function* getByIdScene(
  campaignId: Campaign['id'],
  sessionId: Session['id'],
  sceneId: Scene['id'],
) {
  try {
    const scene = yield* call(SceneService.getById, campaignId, sessionId, sceneId);

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
      yield fork(listScenes, payload.campaignId, payload.sessionId);
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
      payload.campaignId,
      payload.sessionId,
      payload.sceneName,
    );
  }
}

export function* watchGetByIdScene() {
  while (true) {
    const { payload } = yield* take<GetByIdSceneRequestAction>(
      SceneRequestTypes.GET_BY_ID_REQUEST,
    );

    yield fork(getByIdScene, payload.campaignId, payload.sessionId, payload.sceneId);
  }
}

export function* sceneWatcher() {
  return yield all([
    fork(watchListScenes),
    fork(watchCreateScene),
    fork(watchGetByIdScene),
  ]);
}
