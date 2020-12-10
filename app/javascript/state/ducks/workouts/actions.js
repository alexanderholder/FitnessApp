import { createAction } from 'redux-actions';

import types from './types';

const clear = createAction(types.CLEAR);
const addWorkout = createAction(types.ADD_WORKOUT);
const removeWorkout = createAction(types.REMOVE_WORKOUT);
const removeAllWorkouts = createAction(types.REMOVE_ALL_WORKOUTS);

const addExcercise = createAction(types.ADD_EXCERCISE);
const removeExcercise = createAction(types.REMOVE_EXCERCISE);
const removeAllExcercise = createAction(types.REMOVE_ALL_EXCERCISES);

export default {
  clear,
  addWorkout,
  removeWorkout,
  removeAllWorkouts,
  addExcercise,
  removeExcercise,
  removeAllExcercise,
};