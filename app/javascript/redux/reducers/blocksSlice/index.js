import Request from 'javascript/api/request'
import { saveNewExcercise } from 'javascript/redux/reducers/excercisesSlice'

export default function appReducer(state = null, action) {
  switch (action.type) {
    case 'blocks/hydrateBlocks': {
      return action.payload
    }
    case 'blocks/blockAdded': {
      return [...state, action.payload]
    }
    case 'blocks/blocksChanged': {
      return state.map(block => {
        if (block.id !== action.payload.id) {
          return block
        }

        return action.payload
      })
    }
    case 'blocks/blockRemoved': {
      return state.filter(block => block.id !== action.payload)
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

export function copyBlock(id, workout_id) {
  return async function copyBlockThunk(dispatch, getState) {
    const response = await Request.post(`/blocks/copy/${id}`, { block: { workout_id: workout_id }})
    dispatch({ type: 'blocks/blockAdded', payload: response.data.block })
    response.data.excercises.map(excercise => {
      dispatch({ type: 'excercises/excerciseAdded', payload: excercise })
    })
  }
}

export function updateBlock(id, payload) {
  return async function updateBlockThunk(dispatch, getState) {
    const response = await Request.put(`/blocks/${id}`, { block: payload })
    dispatch({ type: 'blocks/blocksChanged', payload: response.data })
  }
}

export function removeBlock(id) {
  return async function removeBlockThunk(dispatch, getState) {
    const response = await Request.delete(`/blocks/${id}`)
    dispatch({ type: 'blocks/blockRemoved', payload: id })
  }
}
