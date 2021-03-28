import Request from 'javascript/api/request'

export default function appReducer(state = null, action) {
  switch (action.type) {
    // case 'blocks/hydrateBlocks': {
    //   return action.payload
    // }
    case 'progressions/progressionsAdded': {
      return [...state, action.payload]
    }
    // case 'blocks/blocksChanged': {
    //   return state.map(block => {
    //     if (block.id !== action.payload.id) {
    //       return block
    //     }

    //     return action.payload
    //   })
    // }
    // case 'blocks/blockRemoved': {
    //   return state.filter(block => block.id !== action.payload)
    // }
    default:
      return state
  }
}

export function saveNewProgression(initialProgression) {
  return async function saveNewProgressionThunk(dispatch, getState) {
    const response = await Request.post('/session_progressions', { session_progression: initialProgression })
    dispatch({ type: 'progressions/progressionsAdded', payload: response.data })
  }
}

// export function updateBlock(id, payload) {
//   return async function updateBlockThunk(dispatch, getState) {
//     const response = await Request.put(`/blocks/${id}`, { block: payload })
//     dispatch({ type: 'blocks/blocksChanged', payload: response.data })
//   }
// }

// export function removeBlock(id) {
//   return async function removeBlockThunk(dispatch, getState) {
//     const response = await Request.delete(`/blocks/${id}`)
//     dispatch({ type: 'blocks/blockRemoved', payload: id })
//   }
// }
