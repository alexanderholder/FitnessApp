import Request from 'javascript/api/request'

export default function appReducer(state = null, action) {
  switch (action.type) {
    case 'workouts/workoutAdded': {
      return [
        ...state,
        {
          id: action.payload.id,
          name: action.payload.name,
          day_number: action.payload.day_number,
          training_template_id: action.payload.training_template_id
        }
      ]
    }
    case 'workouts/workoutNameChanged': {
      return state.map(workout => {
        if (workout.id !== action.payload.id) {
          return workout
        }

        return {
          ...workout,
          name: action.payload.name
        }
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
    dispatch({ type: 'workouts/workoutAdded', payload: response.data })
  }
}

export function saveWorkoutName(id, initialWorkout) {
  return async function saveWorkoutNameThunk(dispatch, getState) {
    const response = await Request.put(`/workouts/${id}`, { workout: initialWorkout })
    dispatch({ type: 'workouts/workoutNameChanged', payload: response.data })
  }
}

export function removeWorkout(id) {
  return async function removeWorkoutThunk(dispatch, getState) {
    const response = await Request.delete(`/workouts/${id}`)
    dispatch({ type: 'workouts/workoutRemoved', payload: id })
  }
}
