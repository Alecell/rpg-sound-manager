import {
  call, put, take, fork, select, all,
} from 'typed-redux-saga';
import isEmpty from 'lodash.isempty';

import { RootState } from 'interfaces/rootState';
import { SessionService } from 'services/api/session/session';
import { UrlParams } from 'interfaces/urlParams';
import { SessionActions } from '../actions';
import { SessionsRequestTypes, Session, ListSessionsState } from '../types';
import {
  ListSessionRequestAction,
  CreateSessionRequestAction,
  GetByIdSessionRequestAction,
} from './types';

export function* listSessions(urlParams: UrlParams) {
  try {
    const sessions = yield* call(SessionService.list, urlParams);

    yield put(SessionActions.list.success({
      sessionList: sessions as ListSessionsState['data'],
    }));
  } catch (err) {
    yield put(SessionActions.list.failure());
  }
}

export function* createSession(
  urlParams: UrlParams,
  sessionName: Session['name'],
) {
  try {
    yield call(SessionService.create, urlParams, sessionName);
    yield call(listSessions, urlParams);

    yield put(SessionActions.create.success());
  } catch (err) {
    yield put(SessionActions.create.failure());
  }
}

export function* getByIdSession(
  urlParams: UrlParams,
) {
  try {
    const session = yield* call(SessionService.getById, urlParams);

    yield put(SessionActions.list.append({ session: session as Session }));
    yield put(SessionActions.getById.success());
  } catch (err) {
    yield put(SessionActions.getById.failure());
  }
}

/**
 * WATCHERS
 */

export function* watchListSessions() {
  while (true) {
    const sessions = yield* select((state: RootState) => state.sessions.list.data);
    const { payload } = yield* take<ListSessionRequestAction>(
      SessionsRequestTypes.LIST_REQUEST,
    );
    if (isEmpty(sessions)) {
      yield fork(listSessions, payload.urlParams);
    }
  }
}

export function* watchCreateSession() {
  while (true) {
    const { payload } = yield* take<CreateSessionRequestAction>(
      SessionsRequestTypes.CREATE_REQUEST,
    );
    yield fork(createSession, payload.urlParams, payload.sessionName);
  }
}

export function* watchGetByIdSession() {
  while (true) {
    const { payload } = yield* take<GetByIdSessionRequestAction>(
      SessionsRequestTypes.GET_BY_ID_REQUEST,
    );

    yield fork(getByIdSession, payload.urlParams);
  }
}

export function* sessionWatcher() {
  return yield all([
    fork(watchListSessions),
    fork(watchCreateSession),
    fork(watchGetByIdSession),
  ]);
}
