import {
  call, put, take, fork, select, all,
} from 'typed-redux-saga';
import isEmpty from 'lodash.isempty';

import { RootState } from 'interfaces/rootState';
import { SessionService } from 'services/api/session/session';
import { Campaign } from 'store/ducks/campaigns/types';
import { SessionActions } from '../actions';
import { SessionsRequestTypes, Session, ListSessionsState } from '../types';
import {
  ListSessionRequestAction,
  CreateSessionRequestAction,
  GetByIdSessionRequestAction,
} from './types';

export function* listSessions(campaignId: Campaign['id']) {
  try {
    const sessions = yield* call(SessionService.list, campaignId);

    yield put(SessionActions.list.success({
      sessionList: sessions as ListSessionsState['data'],
    }));
  } catch (err) {
    yield put(SessionActions.list.failure());
  }
}

export function* createSession(
  campaignId: Campaign['id'],
  sessionName: Session['name'],
) {
  try {
    yield call(SessionService.create, campaignId, sessionName);
    yield call(listSessions, campaignId);

    yield put(SessionActions.create.success());
  } catch (err) {
    yield put(SessionActions.create.failure());
  }
}

export function* getByIdSession(
  campaignId: Campaign['id'],
  sessionId: Session['id'],
) {
  try {
    const session = yield* call(SessionService.getById, campaignId, sessionId);

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
      yield fork(listSessions, payload.campaignId);
    }
  }
}

export function* watchCreateSession() {
  while (true) {
    const { payload } = yield* take<CreateSessionRequestAction>(
      SessionsRequestTypes.CREATE_REQUEST,
    );
    yield fork(createSession, payload.campaignId, payload.sessionName);
  }
}

export function* watchGetByIdSession() {
  while (true) {
    const { payload } = yield* take<GetByIdSessionRequestAction>(
      SessionsRequestTypes.GET_BY_ID_REQUEST,
    );

    yield fork(getByIdSession, payload.campaignId, payload.sessionId);
  }
}

export function* sessionWatcher() {
  return yield all([
    fork(watchListSessions),
    fork(watchCreateSession),
    fork(watchGetByIdSession),
  ]);
}
