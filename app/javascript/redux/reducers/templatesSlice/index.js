import Request from 'javascript/api/request'

export default function appReducer(state = null, action) {
  switch (action.type) {
    case 'trainingTemplates/templateAdded': {
      return [...state, action.payload]
    }
    default:
      return state
  }
}

export function saveNewTrainingTemplate(initialTemplate) {
  return async function saveNewTrainingTemplateThunk(dispatch, getState) {
    const response = await Request.post('http://localhost:3000/training_templates', { training_template: initialTemplate })
    dispatch({ type: 'trainingTemplates/templateAdded', payload: response.data })
  }
}
