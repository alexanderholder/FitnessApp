import Request from 'api/request'
import WindowState from 'windowState'
import { saveNewBlock } from '../blocksSlice'

export default function appReducer(state = null, action) {
  switch (action.type) {
    case 'workouts/hydrateWorkouts': {
      return action.payload
    }
    case 'workouts/workoutAdded': {
      return [...state, action.payload]
    }
    case 'workouts/workoutChanged': {
      return state.map(workout => {
        if (workout.id !== action.payload.id) {
          return workout
        }

        return action.payload
      })
    }
    case 'workouts/workoutRemoved': {
      return state.filter(workout => workout.id !== action.payload)
    }
    default:
      return state
  }
}

export function saveNewWorkout(initialWorkout) {
  return async function saveNewWorkoutThunk(dispatch, getState) {
    const response = await Request.post('/workouts', { workout: initialWorkout })
    WindowState.new_card_id = response.data.id
    dispatch({ type: 'workouts/workoutAdded', payload: response.data })
    dispatch(saveNewBlock({workout_id: response.data.id, }))
  }
}

export function copyWorkout(id, day) {
  return async function copyWorkoutThunk(dispatch, getState) {
    const response = await Request.post(`/workouts/copy/${id}`, { workout: { day_number: day }})
    dispatch({ type: 'workouts/workoutAdded', payload: response.data.workout })
    response.data.blocks.map(block => {
      dispatch({ type: 'blocks/blockAdded', payload: block })
    })
    response.data.excercises.map(excercise => {
      dispatch({ type: 'excercises/excerciseAdded', payload: excercise })
    })
  }
}

export function updateWorkout(id, payload) {
  return async function updateWorkoutThunk(dispatch, getState) {
    const response = await Request.put(`/workouts/${id}`, { workout: payload })
    dispatch({ type: 'workouts/workoutChanged', payload: response.data })
  }
}

export function removeWorkout(id) {
  return async function removeWorkoutThunk(dispatch, getState) {
    const response = await Request.delete(`/workouts/${id}`)
    dispatch({ type: 'workouts/workoutRemoved', payload: id })
  }
}
