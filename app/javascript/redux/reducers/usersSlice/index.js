export default function appReducer(state = null, action) {
  switch (action.type) {
    case 'user/temaplteChanged': {
      return {
        ...state,
        selected_template: action.payload
      }
    }
    default:
      return state
  }
}
