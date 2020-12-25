import { client } from '../api/client'
import { initialState } from './initialState'

function nextId(model) {
  const maxId = model.reduce((maxId, workout) => Math.max(workout.id, maxId), -1)
  return maxId + 1
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'state/stateLoaded': {
      return action.payload
    }
    case 'workouts/workoutAdded': {
      return {
        ...state,
        workouts: [
          ...state.workouts,
          {
            id: nextId(state.workouts),
            name: action.payload.name,
            day_number: action.payload.day_number,
            training_template_id: state.selected_template
          }
        ]
      }
    }
    case 'workouts/workoutNameChanged': {
      return {
        ...state,
        workouts: state.workouts.map(workout => {
          if (workout.id !== action.payload.id) {
            return workout
          }

          return {
            ...workout,
            name: action.payload.name
          }
        })
      }
    }
    case 'blocks/blockAdded': {
      return {
        ...state,
        blocks: [
          ...state.blocks,
          {
            id: nextId(state.blocks),
            name: "",
            workout_id: action.payload.id
          }
        ]
      }
    }
    case 'excercises/excerciseAdded': {
      return {
        ...state,
        excercises: [
          ...state.excercises,
          {
            id: nextId(state.excercises),
            movement: "",
            block_id: action.payload.id
          }
        ]
      }
    }
    case 'excercises/excerciseRemoved': {
      return {
        ...state,
        excercises: state.excercises.filter(excercise =>
          excercise.id !== action.payload.id
        )
      }
    }
    case 'excercises/excerciseMovementChanged': {
      return {
        ...state,
        excercises: state.excercises.map(excercise => {
          if (excercise.id !== action.payload.id) {
            return excercise
          }

          return {
            ...excercise,
            movement: action.payload.movement
          }
        })
      }
    }
    case 'excercises/excerciseSetsRepsChanged': {
      return {
        ...state,
        excercises: state.excercises.map(excercise => {
          if (excercise.id !== action.payload.id) {
            return excercise
          }

          return {
            ...excercise,
            sets_reps: action.payload.sets_reps
          }
        })
      }
    }
    case 'excercises/excerciseWeightChanged': {
      return {
        ...state,
        excercises: state.excercises.map(excercise => {
          if (excercise.id !== action.payload.id) {
            return excercise
          }

          return {
            ...excercise,
            weight_value: action.payload.weight_value
          }
        })
      }
    }
    case 'excercises/excerciseMeasurementChanged': {
      return {
        ...state,
        excercises: state.excercises.map(excercise => {
          if (excercise.id !== action.payload.id) {
            return excercise
          }

          return {
            ...excercise,
            measurement_metric: action.payload.measurement_metric
          }
        })
      }
    }
    case 'template/temaplteChanged': {
      return {
        ...state,
        selected_template: action.payload
      }
    }
    case 'theme/themeChanged': {
      return {
        ...state,
        dark_theme: !state.dark_theme
      }
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
