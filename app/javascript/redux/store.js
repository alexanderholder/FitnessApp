import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import LocalStorage from 'javascript/localStorage';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

let preloadedState
if (window.__INITIAL_STATE__) {
  preloadedState = JSON.parse(window.__INITIAL_STATE__)
}

const store = createStore(rootReducer, preloadedState, composedEnhancer)

export default store
