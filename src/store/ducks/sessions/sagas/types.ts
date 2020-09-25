import { SessionActions } from '../actions';

export type ListSessionRequestAction = ReturnType<typeof SessionActions.list.request>;
export type CreateSessionRequestAction = ReturnType<typeof SessionActions.create.request>;
export type GetByIdSessionRequestAction = ReturnType<typeof SessionActions.getById.request>;
