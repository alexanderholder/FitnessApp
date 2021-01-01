import { combineReducers } from 'redux'
import blocks from './blocksSlice';
import excercises from './excercisesSlice';
import templates from './templatesSlice';
import workouts from './workoutsSlice';
import user from './usersSlice';

export default combineReducers({
  workouts,
  blocks,
  excercises,
  templates,
  user
})
