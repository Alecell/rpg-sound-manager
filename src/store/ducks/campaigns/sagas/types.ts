import { CampaignActions } from '../actions';

export type getByIdRequestAction = ReturnType<typeof CampaignActions.getById.request>;
export type createRequestAction = ReturnType<typeof CampaignActions.create.request>;
export type listRequestAction = ReturnType<typeof CampaignActions.list.request>;
