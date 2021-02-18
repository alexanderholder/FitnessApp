import Request from 'javascript/api/request'
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
    case 'user/logout': {
      return {
        user_id: null,
        signed_in: false,
        response_url: action.payload
      }
    }
    default:
      return state
  }
}

export function logoutUser() {
  return async function logout(dispatch, getState) {
    const response = await Request.get('/logout')
    dispatch({ type: 'user/logout', payload: response.request.responseURL })
  }
}
