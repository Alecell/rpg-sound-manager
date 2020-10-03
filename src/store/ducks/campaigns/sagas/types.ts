import { CampaignActions } from '../actions';

export type ListCampaignRequestAction = ReturnType<typeof CampaignActions.list.request>;
export type CreateCampaignRequestAction = ReturnType<typeof CampaignActions.create.request>;
export type GetByIdCampaignRequestAction = ReturnType<typeof CampaignActions.getById.request>;
