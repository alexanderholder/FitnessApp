import Request from 'javascript/api/request'

const initialState = {
  selected_view: 'Excercise',
  selected_tempalte: null,
  user_id: null,
  signed_in: false,
  response_url: null,
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'user/viewChanged': {
      return {
        ...state,
        selected_view: action.payload
      }
    }
    case 'user/temaplteChanged': {
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

export function currentTemplateChanged(id) {
  return async function currentTemplateChanged(dispatch, getState) {
    dispatch({ type: 'user/temaplteChanged', payload: id })
    const response = await Request.get(`/calendar/${id}`)
    dispatch({ type: 'workouts/hydrateWorkouts', payload: response.data.workouts })
    dispatch({ type: 'blocks/hydrateBlocks', payload: response.data.blocks })
    dispatch({ type: 'excercises/hydrateExcercises', payload: response.data.excercises })
  }
}
