import { SessionActions } from '../actions';

export type listSessionRequestAction = ReturnType<typeof SessionActions.list.request>;
export type createSessionRequestAction = ReturnType<typeof SessionActions.create.request>;
