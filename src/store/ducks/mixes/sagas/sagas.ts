import {
  call, put, take, fork, select, all,
} from 'typed-redux-saga';

import { RootState } from 'interfaces/rootState';
import { UrlParams } from 'interfaces/urlParams';
import { MixService } from 'services/api/mix';
import { ObjectUtil } from 'utils/object/object';
import { MixActions } from '../actions';
import { MixListSuccessAction } from '../actions/types';
import { MixRequestTypes, Mix, ListMixesState } from '../types';
import {
  ListMixRequestAction,
  CreateMixRequestAction,
  GetByIdMixRequestAction,
} from './types';

export function* listMixes(
  urlParams: UrlParams,
) {
  try {
    const mixesState = yield* select((state: RootState) => state.mixes.list.data);

    if (Object.keys(mixesState).length < 2) {
      const mixes = (yield* call(MixService.list, urlParams)) as ListMixesState['data'];
      const mixList = ObjectUtil.appendOnEveryChild<
        MixListSuccessAction['mixList']
      >(mixes, { sceneId: urlParams.sceneId });

      yield put(MixActions.list.success({ mixList }));
    } else {
      yield put(MixActions.list.cancel());
    }
  } catch (err) {
    yield put(MixActions.list.failure());
  }
}

export function* createMix(
  urlParams: UrlParams,
  mixName: Mix['name'],
) {
  try {
    yield call(MixService.create, urlParams, mixName);
    yield call(listMixes, urlParams);

    yield put(MixActions.create.success());
  } catch (err) {
    yield put(MixActions.create.failure());
  }
}

export function* getByIdMix(
  urlParams: UrlParams,
) {
  try {
    const mixes = yield* select((state: RootState) => state.mixes.list.data);

    if (!ObjectUtil.hasKey(mixes, urlParams.mixId)) {
      const mix = (yield* call(MixService.getById, urlParams)) as Mix;

      yield put(MixActions.list.append({
        mix: {
          ...mix,
          sceneId: urlParams.sceneId,
        },
      }));
      yield put(MixActions.getById.success());
    } else {
      yield put(MixActions.getById.cancel());
    }
  } catch (err) {
    yield put(MixActions.getById.failure());
  }
}

/**
 * WATCHERS
 */

export function* watchListMixes() {
  while (true) {
    const { payload } = yield* take<ListMixRequestAction>(
      MixRequestTypes.LIST_REQUEST,
    );

    yield fork(listMixes, payload.urlParams);
  }
}

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

export function* watchGetByIdMix() {
  while (true) {
    const { payload } = yield* take<GetByIdMixRequestAction>(
      MixRequestTypes.GET_BY_ID_REQUEST,
    );

    yield fork(getByIdMix, payload.urlParams);
  }
}

export function* mixWatcher() {
  return yield all([
    fork(watchListMixes),
    fork(watchCreateMix),
    fork(watchGetByIdMix),
  ]);
}
