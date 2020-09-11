import {
  call,
  put,
  fork,
  select,
  take,
  all,
} from 'typed-redux-saga';
import isEmpty from 'lodash.isempty';

import { RootState } from 'interfaces/rootState';
import { CampaignService } from 'services/campaign';
import { CampaignActions } from '../actions';
import { CampaignsRequestTypes, ICampaign } from '../types';
import { getByIdCampaignRequestAction, createCampaignRequestAction } from './types';

export function* listCampaigns() {
  try {
    const data = yield* call(CampaignService.list);

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

export function* getByIdCampaign(campaignId: ICampaign['id']) {
  try {
    const campaign = yield* call(CampaignService.getById, campaignId);

    yield put(CampaignActions.list.append(campaign));
    yield put(CampaignActions.getById.success());
  } catch (err) {
    yield put(CampaignActions.getById.failure());
  }
}

/**
 * WATCHERS
 */

export function* watchListCampaigns() {
  while (true) {
    const campaigns = yield* select((state: RootState) => state.campaigns.list.data);
    yield take(CampaignsRequestTypes.LIST_REQUEST);
    if (isEmpty(campaigns)) {
      yield fork(listCampaigns);
    }
  }
}

export function* watchCreateCampaign() {
  while (true) {
    const { payload } = yield* take<createCampaignRequestAction>(
      CampaignsRequestTypes.CREATE_REQUEST,
    );
    yield fork(createCampaign, payload.campaignName);
  }
}

export function* watchGetByIdCampaign() {
  while (true) {
    const { payload } = yield* take<getByIdCampaignRequestAction>(
      CampaignsRequestTypes.GET_BY_ID_REQUEST,
    );

    yield fork(getByIdCampaign, payload.campaignId);
  }
}

export function* campaignWatcher() {
  return yield all([
    fork(watchListCampaigns),
    fork(watchCreateCampaign),
    fork(watchGetByIdCampaign),
  ]);
}
