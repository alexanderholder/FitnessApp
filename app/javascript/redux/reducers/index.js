import { combineReducers } from 'redux'
import { client } from '../../api/client'

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

// Thunk function
export async function fetchState(dispatch, getState) {
  const response = await client.get('http://localhost:3000/api/calender')
  dispatch({ type: 'state/stateLoaded', payload: JSON.parse(response) })
}