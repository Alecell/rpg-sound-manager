import {
  call, put, take, fork, all,
} from 'typed-redux-saga';

import { SessionService } from 'services/api/session/session';
import { UrlParams } from 'interfaces/urlParams';
import { queryClient } from 'config/query';
import { EReactQueryKeys } from 'enums/reactQueryKeys';
import { SessionActions } from '../actions/actions';
import { SessionsRequestTypes, Session } from '../types';
import { CreateSessionRequestAction } from './types';

export function* createSession(
  urlParams: UrlParams,
  sessionName: Session['name'],
) {
  try {
    yield* call(SessionService.create, urlParams, sessionName);

    yield* call(
      [queryClient, queryClient.refetchQueries],
      [EReactQueryKeys.LIST_SESSION, urlParams.campaignId],
      { active: true, exact: true },
    );

    yield* put(SessionActions.create.success());
  } catch (err) {
    yield* put(SessionActions.create.failure());
  }
}

/**
 * WATCHERS
 */

export function* watchCreateSession() {
  while (true) {
    const { payload } = yield* take<CreateSessionRequestAction>(
      SessionsRequestTypes.CREATE_REQUEST,
    );
    yield* fork(createSession, payload.urlParams, payload.sessionName);
  }
}

export function* sessionWatcher() {
  return yield* all([
    fork(watchCreateSession),
  ]);
}
