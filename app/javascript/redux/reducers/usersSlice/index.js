import LocalStorage from 'javascript/localStorage'

export default function appReducer(state = null, action) {
  switch (action.type) {
    case 'user/temaplteChanged': {
      LocalStorage.setItem('current_template_id', action.payload)
      return {
        ...state,
        selected_template: action.payload
      }
    }
    default:
      return state
  }
}
