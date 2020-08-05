import { combineReducers } from 'redux';

import { EFirestoreCollections } from 'enums/firestoreCollections';

import { campaignsReducer } from './campaigns/reducers';

export const rootReducer = combineReducers({
  [EFirestoreCollections.CAMPAIGNS]: campaignsReducer,
});
