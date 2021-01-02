import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import LocalStorage from 'javascript/localStorage';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

let preloadedState
if (window.__INITIAL_STATE__) {
  preloadedState = JSON.parse(window.__INITIAL_STATE__)
  const selected_template = LocalStorage.getItem('current_template_id')
  if (selected_template) {
    preloadedState.user.selected_template = selected_template
  }
}

const store = createStore(rootReducer, preloadedState, composedEnhancer)

export default store
