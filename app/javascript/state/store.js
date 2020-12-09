import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import logger                                                     from 'redux-logger';

// import { remindersMiddlewares } from './middlewares';
import * as reducers            from './ducks';

const workouts = [
  { id: 1, name: "EMOM", day_number: 1, excercises: [
    { id: 1, name: "Clean & Jerk" },
    { id: 2, name: "Snatch" }
  ]},
  { id: 2, name: "AMRAP", day_number: 2, excercises: [
    { id: 3, name: "Box Jumps" },
    { id: 4, name: "Squat" }
  ]}
]

export const initialState = {
  template: { name: "Crossfit", length: 5 },
  workouts: workouts
}

const configureStore = (preloadedState = initialState) => {
  const middlewares = [logger]//[logger, ...remindersMiddlewares];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const rootReducer = combineReducers(reducers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./ducks', () => store.replaceReducer(rootReducer));
  }

  return store;
};

export default configureStore;
