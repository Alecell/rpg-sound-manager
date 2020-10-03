// import { Action, createReducer } from 'typesafe-actions';

// import { CampaignActions } from '../actions';
// import { ListCampaignsState } from '../types';

// export const INITIAL_STATE: ListCampaignsState = {
//   data: {},
//   loading: false,
//   error: false,
// };

// export const baseReducer = (
//   action
// ) => createReducer<ListCampaignsState, Action>(INITIAL_STATE)
//   .handleAction(action.campaigns, (store) => ({
//     ...store,
//     loading: true,
//     error: false,
//   }))
//   .handleAction(action.sessions, (store, action) => ({
//     data: action.payload,
//     loading: false,
//     error: false,
//   }))
//   .handleAction(action.scenes, (store) => ({
//     data: {},
//     loading: false,
//     error: true,
//   }));
const role = 'sda';
export {
  role,
};
