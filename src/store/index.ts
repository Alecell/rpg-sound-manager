import get from 'lodash.get';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';

import { rootReducer } from './ducks/rootReducer';
import { rootSaga } from './ducks/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = get(window, '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__') || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      sagaMiddleware,
    ),
  ),
);

sagaMiddleware.run(rootSaga);
