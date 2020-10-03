import { combineReducers } from 'redux';

import { EFirestoreCollections } from 'enums/firestoreCollections';

import { campaignsReducer } from './campaigns/reducers';
import { sessionsReducer } from './sessions/reducers';
import { scenesReducer } from './scenes/reducers';
import { soundsReducer } from './sounds/reducers';
import { mixesReducer } from './mixes/reducers';

export const rootReducer = combineReducers({
  [EFirestoreCollections.CAMPAIGNS]: campaignsReducer,
  [EFirestoreCollections.SESSIONS]: sessionsReducer,
  [EFirestoreCollections.SCENES]: scenesReducer,
  [EFirestoreCollections.MIXES]: mixesReducer,
  [EFirestoreCollections.SOUNDS]: soundsReducer,
});
