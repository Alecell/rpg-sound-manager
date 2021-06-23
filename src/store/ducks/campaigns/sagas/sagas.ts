import {
  call,
  put,
  fork,
  take,
  all,
} from 'typed-redux-saga';

import { CampaignService } from 'services/api/campaign/campaign';
import { queryClient } from 'config/query';
import { EReactQueryKeys } from 'enums/reactQueryKeys';
import { UserService } from 'services/user/user';
import { CampaignActions } from '../actions/actions';
import { CampaignsRequestTypes, Campaign } from '../types';
import { CreateCampaignRequestAction } from './types';

export function* createCampaign(campaignName: Campaign['name']) {
  try {
    yield call(CampaignService.create, campaignName);

    yield* call(
      [queryClient, queryClient.refetchQueries],
      [EReactQueryKeys.LIST_CAMPAIGN, UserService.getToken()],
      { active: true, exact: true },
    );

    yield put(CampaignActions.create.success());
  } catch (err) {
    yield put(CampaignActions.create.failure());
  }
}

/**
 * WATCHERS
 */

export function* watchCreateCampaign() {
  while (true) {
    const { payload } = yield* take<CreateCampaignRequestAction>(
      CampaignsRequestTypes.CREATE_REQUEST,
    );
    yield fork(createCampaign, payload.campaignName);
  }
}

export function* campaignWatcher() {
  return yield* all([
    fork(watchCreateCampaign),
  ]);
}
