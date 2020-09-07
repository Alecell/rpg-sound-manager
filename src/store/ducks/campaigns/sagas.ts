import {
  call,
  put,
  fork,
  select,
  take,
  all,
} from 'redux-saga/effects';
import isEmpty from 'lodash.isempty';

import { RootState } from 'interfaces/rootState';
import { CampaignService } from 'services/campaign';
import { CampaignActions } from './actions';
import { CampaignsRequestTypes, ICampaign } from './types';

export function* listCampaigns() {
  try {
    const data = yield call(CampaignService.list);

    yield put(CampaignActions.list.success(data));
  } catch (err) {
    yield put(CampaignActions.list.failure());
  }
}

export function* createCampaign(campaignName: ICampaign['name']) {
  try {
    yield call(CampaignService.create, campaignName);
    yield call(listCampaigns);

    yield put(CampaignActions.create.success());
  } catch (err) {
    yield put(CampaignActions.create.failure());
  }
}

/**
 * WATCHERS
 */

export function* watchListCampaigns() {
  while (true) {
    const campaigns = yield select((state: RootState) => state.campaigns.list.data);
    yield take(CampaignsRequestTypes.LIST_REQUEST);
    if (isEmpty(campaigns)) {
      yield fork(listCampaigns);
    }
  }
}

export function* watchCreateCampaign() {
  while (true) {
    const { payload } = yield take(CampaignsRequestTypes.CREATE_REQUEST);
    yield fork(createCampaign, payload.campaignName);
  }
}

export function* campaignWatcher() {
  return yield all([
    fork(watchListCampaigns),
    fork(watchCreateCampaign),
  ]);
}
