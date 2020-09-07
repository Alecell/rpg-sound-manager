import { action } from 'typesafe-actions';

import {
  ListSessionsState,
  SessionsRequestTypes,
} from './types';

export class SessionActions {
  static readonly list = {
    request: (campaignId: string) => action(SessionsRequestTypes.LIST_REQUEST, { campaignId }),
    success: (
      session: ListSessionsState['data'] = {},
    ) => action(SessionsRequestTypes.LIST_SUCCESS, session),
    failure: () => action(SessionsRequestTypes.LIST_FAILURE),
  } as const;

  static readonly create = {
    request: (
      campaignId: string,
      sessionName: string,
    ) => action(SessionsRequestTypes.CREATE_REQUEST, { campaignId, sessionName }),
    success: () => action(SessionsRequestTypes.CREATE_SUCCESS),
    failure: () => action(SessionsRequestTypes.CREATE_FAILURE),
  } as const;
}
