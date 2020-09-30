import {
  call, put, take, fork, select, all,
} from 'typed-redux-saga';
import isEmpty from 'lodash.isempty';

import { RootState } from 'interfaces/rootState';
import { Scene } from 'store/ducks/scenes/types';
import { Session } from 'store/ducks/sessions/types';
import { Campaign } from 'store/ducks/campaigns/types';
import { MixService } from 'services/api/mix';
import { MixActions } from '../actions';
import { MixRequestTypes, Mix, ListMixesState } from '../types';
import { ListMixRequestAction, CreateMixRequestAction, GetByIdMixRequestAction } from './types';

export function* listMixes(
  campaignId: Campaign['id'],
  sessionId: Session['id'],
  sceneId: Scene['id'],
) {
  try {
    const mixes = yield* call(MixService.list, campaignId, sessionId, sceneId);

    yield put(MixActions.list.success({
      mixList: mixes as ListMixesState['data'],
    }));
  } catch (err) {
    yield put(MixActions.list.failure());
  }
}

export function* createMix(
  campaignId: Campaign['id'],
  sessionId: Session['id'],
  sceneId: Scene['id'],
  mixName: Mix['name'],
) {
  try {
    yield call(MixService.create, campaignId, sessionId, sceneId, mixName);
    yield call(listMixes, campaignId, sessionId, sceneId);

    yield put(MixActions.create.success());
  } catch (err) {
    yield put(MixActions.create.failure());
  }
}

export function* getByIdMix(
  campaignId: Campaign['id'],
  sessionId: Session['id'],
  sceneId: Scene['id'],
  mixId: Mix['id'],
) {
  try {
    const mix = yield* call(MixService.getById, campaignId, sessionId, sceneId, mixId);

    yield put(MixActions.list.append({ mix: mix as Mix }));
    yield put(MixActions.getById.success());
  } catch (err) {
    yield put(MixActions.getById.failure());
  }
}

/**
 * WATCHERS
 */

export function* watchListMixes() {
  while (true) {
    const mixes = yield* select((state: RootState) => state.mixes.list.data);
    const { payload } = yield* take<ListMixRequestAction>(
      MixRequestTypes.LIST_REQUEST,
    );
    // TODO: essa verificação tem que ser mais precisa, baseada no ID e na URL
    if (isEmpty(mixes)) {
      yield fork(listMixes, payload.campaignId, payload.sessionId, payload.sceneId);
    }
  }
}

export function* watchCreateMix() {
  while (true) {
    const { payload } = yield* take<CreateMixRequestAction>(
      MixRequestTypes.CREATE_REQUEST,
    );
    yield fork(
      createMix,
      payload.campaignId,
      payload.sessionId,
      payload.sceneId,
      payload.mixName,
    );
  }
}

export function* watchGetByIdMix() {
  while (true) {
    const { payload } = yield* take<GetByIdMixRequestAction>(
      MixRequestTypes.GET_BY_ID_REQUEST,
    );

    yield fork(
      getByIdMix,
      payload.campaignId,
      payload.sessionId,
      payload.sceneId,
      payload.mixId,
    );
  }
}

export function* mixWatcher() {
  return yield all([
    fork(watchListMixes),
    fork(watchCreateMix),
    fork(watchGetByIdMix),
  ]);
}
