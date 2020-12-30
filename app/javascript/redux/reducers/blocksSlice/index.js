function nextId(model) {
  const maxId = model.reduce((maxId, workout) => Math.max(workout.id, maxId), -1)
  return maxId + 1
}

export default function appReducer(state = null, action) {
  switch (action.type) {
    case 'blocks/blockAdded': {
      return [
        ...state,
        {
          id: nextId(state),
          name: "",
          workout_id: action.payload.id
        }
      ]
    }
    default:
      return state
  }
}
