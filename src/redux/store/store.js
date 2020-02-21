import { applyMiddleware, createStore } from 'redux';

import { createLogger } from "redux-logger";
import { createPromise } from 'redux-promise-middleware'
import thunk from 'redux-thunk';

import reducer from '../reducers/index';

const middleware = applyMiddleware(createPromise(), thunk, createLogger() )

export default createStore(reducer, middleware);