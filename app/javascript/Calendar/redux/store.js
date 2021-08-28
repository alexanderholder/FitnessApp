import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";

let preloadedState;
if (window.__INITIAL_STATE__) {
  preloadedState = JSON.parse(window.__INITIAL_STATE__);
}

const store = createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunkMiddleware)
);

export default store;
