const initialState = {
  selected_template: 1,
  user_details: { user_id: 1, theme: "dark" },
  templates: [
    { id: 1, name: "Crossfit", length: 5, user_id: 1 },
    { id: 2, name: "Body Building", length: 7, user_id: 1 },
    { id: 3, name: "Strength", length: 7, user_id: 2 }
  ],
  workouts: [
    { id: 1, template_id: 1, name: "EMOM", day_number: 1 },
    { id: 2, template_id: 1, name: "AMRAP", day_number: 2 }
  ],
  excercises: [
    { id: 1, workout_id: 1, name: "Clean & Jerk" },
    { id: 2, workout_id: 1, name: "Snatch" },
    { id: 3, workout_id: 2, name: "Box Jumps" },
    { id: 4, workout_id: 2, name: "Squat" }
  ]
}

function nextId(model) {
  const maxId = model.reduce((maxId, workout) => Math.max(workout.id, maxId), -1)
  return maxId + 1
}

// Use the initialState as a default value
export default function appReducer(state = initialState, action) {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    // Do something here based on the different types of actions
    case 'workouts/workoutAdded': {
      // We need to return a new state object
      return {
        // that has all the existing state data
        ...state,
        // but has a new array for the `workouts` field
        workouts: [
          // with all of the old workouts
          ...state.workouts,
          // and the new workout object
          {
            // Use an auto-incrementing numeric ID for this example
            id: nextId(state.workouts),
            name: action.payload.name,
            day_number: action.payload.day_number
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
    case 'excercises/excerciseAdded': {
      return {
        ...state,
        excercises: [
          ...state.excercises,
          {
            id: nextId(state.excercises),
            workout_id: action.payload.id,
            name: ""
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
    case 'excercises/excerciseNameChanged': {
      return {
        ...state,
        excercises: state.excercises.map(excercise => {
          if (excercise.id !== action.payload.id) {
            return excercise
          }

          return {
            ...excercise,
            name: action.payload.name
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
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state
  }
}
