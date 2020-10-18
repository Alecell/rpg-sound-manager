import {
  call, put, take, fork, select, all,
} from 'typed-redux-saga';

import { RootState } from 'interfaces/rootState';
import { SessionService } from 'services/api/session/session';
import { UrlParams } from 'interfaces/urlParams';
import { ObjectUtil } from 'utils/object/object';
import { SessionActions } from '../actions';
import { SessionsRequestTypes, Session, ListSessionsState } from '../types';
import {
  ListSessionRequestAction,
  CreateSessionRequestAction,
  GetByIdSessionRequestAction,
} from './types';
import { SessionListSuccessAction } from '../actions/types';

export function* listSessions(urlParams: UrlParams) {
  try {
    const sessionsState = yield* select((state: RootState) => state.sessions.list.data);

    if (Object.keys(sessionsState).length < 2) {
      const sessions = (yield* call(SessionService.list, urlParams)) as ListSessionsState['data'];
      const sessionList = ObjectUtil.appendOnEveryChild<
        SessionListSuccessAction['sessionList']
      >(sessions, { campaignId: urlParams.campaignId });

      yield put(SessionActions.list.success({ sessionList }));
    } else {
      yield put(SessionActions.list.cancel());
    }
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
    const sessions = yield* select((state: RootState) => state.sessions.list.data);

    if (!ObjectUtil.hasKey(sessions, urlParams.sessionId)) {
      const session = (yield* call(SessionService.getById, urlParams)) as Session;

      yield* put(SessionActions.list.append({
        session: {
          ...session,
          campaignId: urlParams.sessionId,
        },
      }));
      yield* put(SessionActions.getById.success());
    } else {
      yield* put(SessionActions.getById.cancel());
    }
  } catch (err) {
    yield* put(SessionActions.getById.failure());
  }
}

/**
 * WATCHERS
 */

export function* watchListSessions() {
  while (true) {
    const { payload } = yield* take<ListSessionRequestAction>(
      SessionsRequestTypes.LIST_REQUEST,
    );

    yield* fork(listSessions, payload.urlParams);
  }
}

export function* watchCreateSession() {
  while (true) {
    const { payload } = yield* take<CreateSessionRequestAction>(
      SessionsRequestTypes.CREATE_REQUEST,
    );
    yield* fork(createSession, payload.urlParams, payload.sessionName);
  }
}

export function* watchGetByIdSession() {
  while (true) {
    const { payload } = yield* take<GetByIdSessionRequestAction>(
      SessionsRequestTypes.GET_BY_ID_REQUEST,
    );

    yield* fork(getByIdSession, payload.urlParams);
  }
}

export function* sessionWatcher() {
  return yield all([
    fork(watchListSessions),
    fork(watchCreateSession),
    fork(watchGetByIdSession),
  ]);
}
