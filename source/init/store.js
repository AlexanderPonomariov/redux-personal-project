// Core
import { createStore, applyMiddleware, compose } from 'redux';

// Instruments
import { middlewares, dev, sagaMiddleware } from './middlewares';
import { rootReducer } from './rootReducer';
import { rootSaga } from "./rootSaga";

const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = dev && devtools ? devtools : compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares)),
);

export { store };

sagaMiddleware.run(rootSaga);
