import {
  call, put, take, fork, select, all,
} from 'typed-redux-saga';
import isEmpty from 'lodash.isempty';

import { RootState } from 'interfaces/rootState';
import { IUrlParams } from 'interfaces/urlParams';
import { SessionService } from 'services/sessions';
import { SessionActions } from '../actions';
import { SessionsRequestTypes, ISession } from '../types';
import { listSessionRequestAction, createSessionRequestAction } from './types';

export function* listSessions(campaignId: string) {
  try {
    const sessions = yield* call(SessionService.list, campaignId);

    yield put(SessionActions.list.success(sessions));
  } catch (err) {
    yield put(SessionActions.list.failure());
  }
}

export function* createSession(
  campaignId: IUrlParams['campaignId'],
  sessionName: ISession['name'],
) {
  try {
    yield call(SessionService.create, campaignId, sessionName);
    yield call(listSessions, campaignId);

    yield put(SessionActions.create.success());
  } catch (err) {
    yield put(SessionActions.create.failure());
  }
}

/**
 * WATCHERS
 */

export function* watchListSessions() {
  while (true) {
    const sessions = yield* select((state: RootState) => state.sessions.list.data);
    const { payload } = yield* take<listSessionRequestAction>(
      SessionsRequestTypes.LIST_REQUEST,
    );
    if (isEmpty(sessions)) {
      yield fork(listSessions, payload.campaignId);
    }
  }
}

export function* watchCreateSession() {
  while (true) {
    const { payload } = yield* take<createSessionRequestAction>(
      SessionsRequestTypes.CREATE_REQUEST,
    );
    yield fork(createSession, payload.campaignId, payload.sessionName);
  }
}

export function* sessionWatcher() {
  return yield all([
    fork(watchListSessions),
    fork(watchCreateSession),
  ]);
}
