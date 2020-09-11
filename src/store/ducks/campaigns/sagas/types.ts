import { CampaignActions } from '../actions';

export type getByIdCampaignRequestAction = ReturnType<typeof CampaignActions.getById.request>;
export type createCampaignRequestAction = ReturnType<typeof CampaignActions.create.request>;
