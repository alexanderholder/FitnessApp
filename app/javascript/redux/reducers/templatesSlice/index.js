import Request from 'javascript/api/request'

export default function appReducer(state = null, action) {
  switch (action.type) {
    case 'trainingTemplates/templateAdded': {
      return [...state, action.payload]
    }
    case 'trainingTemplates/templateRemoved': {
      return state.filter(template => template.id !== action.payload)
    }
    default:
      return state
  }
}

export function saveNewTrainingTemplate(initialTemplate) {
  return async function saveNewTrainingTemplateThunk(dispatch, getState) {
    const response = await Request.post('/training_templates', { training_template: initialTemplate })
    dispatch({ type: 'trainingTemplates/templateAdded', payload: response.data })
    dispatch({ type: 'user/temaplteChanged', payload: response.data.id })
  }
}

export function deleteTrainingTemplate(current_id, next_id) {
  return async function deleteTrainingTemplateThunk(dispatch, getState) {
    const response = await Request.delete(`/training_templates/${current_id}`)
    dispatch({ type: 'user/temaplteChanged', payload: next_id })
    dispatch({ type: 'trainingTemplates/templateRemoved', payload: current_id })
  }
}
