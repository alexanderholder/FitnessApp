function nextId(model) {
  const maxId = model.reduce((maxId, workout) => Math.max(workout.id, maxId), -1)
  return maxId + 1
}

export default function appReducer(state = null, action) {
  switch (action.type) {
    case 'excercises/excerciseAdded': {
      return [
        ...state,
        {
          id: nextId(state),
          movement: "",
          block_id: action.payload.id
        }
      ]
    }
    case 'excercises/excerciseRemoved': {
      return state.filter(excercise => excercise.id !== action.payload.excercise_id)
    }
    case 'excercises/excerciseMovementChanged': {
      return state.map(excercise => {
        if (excercise.id !== action.payload.id) {
          return excercise
        }

        return {
          ...excercise,
          movement: action.payload.movement
        }
      })
    }
    case 'excercises/excerciseSetsRepsChanged': {
      return state.map(excercise => {
        if (excercise.id !== action.payload.id) {
          return excercise
        }

        return {
          ...excercise,
          sets_reps: action.payload.sets_reps
        }
      })
    }
    case 'excercises/excerciseWeightChanged': {
      return state.map(excercise => {
        if (excercise.id !== action.payload.id) {
          return excercise
        }

        return {
          ...excercise,
          weight_value: action.payload.weight_value
        }
      })
    }
    case 'excercises/excerciseMeasurementChanged': {
      return state.map(excercise => {
        if (excercise.id !== action.payload.id) {
          return excercise
        }

        return {
          ...excercise,
          measurement_metric: action.payload.measurement_metric
        }
      })
    }
    default:
      return state
  }
}
