import { call, put } from 'redux-saga/effects';
import { CampaignService } from 'services/campaign';
import { CampaignActions } from './actions';

export function* loadCampaigns() {
  try {
    const data = yield call(CampaignService.list);

    yield put(CampaignActions.loadList.success(data));
  } catch (err) {
    yield put(CampaignActions.loadList.failure());
  }
}
