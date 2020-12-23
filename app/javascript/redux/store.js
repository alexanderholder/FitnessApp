import { createStore } from 'redux'
import rootReducer from './reducer'

let preloadedState
const persistedWorkoutsString = localStorage.getItem('workouts')

if (persistedWorkoutsString) {
  preloadedState = {
    workouts: JSON.parse(persistedWorkoutsString)
  }
}

const store = createStore(rootReducer, preloadedState)

export default store
