import {
  call, put, take, fork, select, all,
} from 'typed-redux-saga';
import isEmpty from 'lodash.isempty';

import { RootState } from 'interfaces/rootState';
import { UrlParams } from 'interfaces/urlParams';
import { MixService } from 'services/api/mix';
import { MixActions } from '../actions';
import { MixRequestTypes, Mix, ListMixesState } from '../types';
import { ListMixRequestAction, CreateMixRequestAction, GetByIdMixRequestAction } from './types';

export function* listMixes(
  urlParams: UrlParams,
) {
  try {
    const mixes = yield* call(MixService.list, urlParams);

    yield put(MixActions.list.success({
      mixList: mixes as ListMixesState['data'],
    }));
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
    const mix = yield* call(MixService.getById, urlParams);

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
      yield fork(listMixes, payload.urlParams);
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

    yield fork(
      getByIdMix,
      payload.urlParams,
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
