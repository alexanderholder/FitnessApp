import Request from 'Calendar/api/request'

export default function appReducer(state = null, action) {
  switch (action.type) {
    case 'progressions/progressionsAdded': {
      return [...state, action.payload]
    }
    default:
      return state
  }
}

export function saveNewProgression(name, progressions) {
  return async function saveNewProgressionThunk(dispatch, getState) {
    const request = progressions.map(progression => ({ sets_reps: progression, }))
    const progression_response = await Request.post('/session_progressions', { session_progression: { name: name, progressions: request, }})

    dispatch({
      type: 'progressions/progressionsAdded',
      payload: { progression: progression_response.data.session_progression, sets_reps: progression_response.data.progressions }
    })
  }
}

export function createProgressionTemplate(excercise, progression, day) {
  return async function createProgressionTemplate(dispatch, getState) {
    const response = await Request.post(
      '/session_progressions/bulk_create_sessions',
      { session_progression: { workout_progressions: { excercise: excercise, progression_id: progression, day_number: day }}}
    )
    response.data.workouts.map(workout => dispatch({ type: 'workouts/workoutAdded', payload: workout }))
    response.data.blocks.map(block => dispatch({ type: 'blocks/blockAdded', payload: block }))
    response.data.excercises.map(excercise => dispatch({ type: 'excercises/excerciseAdded', payload: excercise }))
  }
}