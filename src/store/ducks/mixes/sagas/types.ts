import { MixActions } from '../actions';

export type ListMixRequestAction = ReturnType<typeof MixActions.list.request>;
export type CreateMixRequestAction = ReturnType<typeof MixActions.create.request>;
export type GetByIdMixRequestAction = ReturnType<typeof MixActions.getById.request>;
