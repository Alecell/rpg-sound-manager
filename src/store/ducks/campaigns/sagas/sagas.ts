import {
  call,
  put,
  fork,
  select,
  take,
  all,
} from 'typed-redux-saga';

import { UrlParams } from 'interfaces/urlParams';
import { RootState } from 'interfaces/rootState';
import { CampaignService } from 'services/api/campaign';
import { UserService } from 'services/user';
import { ObjectUtil } from 'utils/object/object';
import { CampaignActions } from '../actions';
import { CampaignsRequestTypes, Campaign, ListCampaignsState } from '../types';
import {
  GetByIdCampaignRequestAction,
  CreateCampaignRequestAction,
  ListCampaignRequestAction,
} from './types';
import { CampaignListSuccessAction } from '../actions/types';

export function* listCampaigns() {
  try {
    const campaignsState = yield* select((state: RootState) => state.campaigns.list.data);

    if (Object.keys(campaignsState).length < 2) {
      const campaigns = (yield* call(CampaignService.list)) as ListCampaignsState['data'];
      const campaignList = ObjectUtil.appendOnEveryChild<
        CampaignListSuccessAction['campaignList']
      >(campaigns, { userId: UserService.getToken() });

      yield put(CampaignActions.list.success({ campaignList }));
    } else {
      yield* put(CampaignActions.list.cancel());
    }
  } catch (err) {
    yield put(CampaignActions.list.failure());
  }
}

export function* createCampaign(campaignName: Campaign['name']) {
  try {
    yield call(CampaignService.create, campaignName);
    yield call(listCampaigns);

    yield put(CampaignActions.create.success());
  } catch (err) {
    yield put(CampaignActions.create.failure());
  }
}

export function* getByIdCampaign(urlParams: UrlParams) {
  try {
    const campaigns = yield* select((state: RootState) => state.campaigns.list.data);

    if (!ObjectUtil.hasKey(campaigns, urlParams.campaignId)) {
      const campaign = (yield* call(CampaignService.getById, urlParams)) as Campaign;

      yield put(CampaignActions.list.append({
        campaign: {
          ...campaign,
          userId: UserService.getToken(),
        },
      }));
      yield put(CampaignActions.getById.success());
    } else {
      yield put(CampaignActions.getById.cancel());
    }
  } catch (err) {
    yield* put(CampaignActions.getById.failure());
  }
}

/**
 * WATCHERS
 */

export function* watchListCampaigns() {
  while (true) {
    yield* take<ListCampaignRequestAction>(CampaignsRequestTypes.LIST_REQUEST);
    yield fork(listCampaigns);
  }
}

export function* watchCreateCampaign() {
  while (true) {
    const { payload } = yield* take<CreateCampaignRequestAction>(
      CampaignsRequestTypes.CREATE_REQUEST,
    );
    yield fork(createCampaign, payload.campaignName);
  }
}

export function* watchGetByIdCampaign() {
  while (true) {
    const { payload } = yield* take<GetByIdCampaignRequestAction>(
      CampaignsRequestTypes.GET_BY_ID_REQUEST,
    );

    yield fork(getByIdCampaign, payload.urlParams);
  }
}

export function* campaignWatcher() {
  return yield all([
    fork(watchListCampaigns),
    fork(watchCreateCampaign),
    fork(watchGetByIdCampaign),
  ]);
}
