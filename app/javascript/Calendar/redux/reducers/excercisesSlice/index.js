import Request from "api/request";

export default function appReducer(state = null, action) {
  switch (action.type) {
    case "excercises/hydrateExcercises": {
      return action.payload;
    }
    case "excercises/excerciseAdded": {
      return [...state, action.payload];
    }
    case "excercises/excerciseChanged": {
      return state.map((excercise) => {
        if (excercise.id !== action.payload.id) {
          return excercise;
        }

        return action.payload;
      });
    }
    case "excercises/excerciseRemoved": {
      return state.filter((excercise) => excercise.id !== action.payload);
    }
    default:
      return state;
  }
}

export function saveNewExcercise(initialExcercise) {
  return async function saveNewExcerciseThunk(dispatch, getState) {
    const response = await Request.post("/excercises", {
      excercise: initialExcercise,
    });
    dispatch({ type: "excercises/excerciseAdded", payload: response.data });
  };
}

export function updateExcercise(id, payload) {
  return async function updateExcerciseThunk(dispatch, getState) {
    const response = await Request.put(`/excercises/${id}`, {
      excercise: payload,
    });
    dispatch({ type: "excercises/excerciseChanged", payload: response.data });
  };
}

export function removeExcercise(id) {
  return async function removeExcerciseThunk(dispatch, getState) {
    const response = await Request.delete(`/excercises/${id}`);
    dispatch({ type: "excercises/excerciseRemoved", payload: id });
  };
}
