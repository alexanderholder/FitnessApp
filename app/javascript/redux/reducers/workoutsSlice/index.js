import { client } from '../../../api/client'

function nextId(model) {
  const maxId = model.reduce((maxId, workout) => Math.max(workout.id, maxId), -1)
  return maxId + 1
}

export default function appReducer(state = null, action) {
  switch (action.type) {
    case 'workouts/workoutAdded': {
      return [
        ...state,
        {
          id: nextId(state),
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
    default:
      return state
  }
}

// Thunk function
export async function fetchState(dispatch, getState) {
  const response = await client.get('http://localhost:3000/api/calender')
  dispatch({ type: 'state/stateLoaded', payload: JSON.parse(response) })
}
