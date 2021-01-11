import Request from 'javascript/api/request'
import { saveNewExcercise } from 'javascript/redux/reducers/excercisesSlice'

export default function appReducer(state = null, action) {
  switch (action.type) {
    case 'blocks/blockAdded': {
      return [...state, action.payload]
    }
    default:
      return state
  }
}

export function saveNewBlock(initialBlock) {
  return async function saveNewBlockThunk(dispatch, getState) {
    const response = await Request.post('/blocks', { block: initialBlock })
    dispatch({ type: 'blocks/blockAdded', payload: response.data })
    dispatch(saveNewExcercise({ movement: "", block_id: response.data.id }))
  }
}
