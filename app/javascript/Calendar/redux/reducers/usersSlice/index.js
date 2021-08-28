import Request from "api/request";

export default function appReducer(state = null, action) {
  switch (action.type) {
    case "user/viewChanged": {
      return {
        ...state,
        selected_view: action.payload,
      };
    }
    case "user/temaplteChanged": {
      return {
        ...state,
        selected_template: action.payload,
      };
    }
    case "user/logout": {
      return {
        user_id: null,
        signed_in: false,
        response_url: action.payload,
      };
    }
    default:
      return state;
  }
}

export function logoutUser() {
  return async function logout(dispatch, getState) {
    const response = await Request.get("/logout");
    dispatch({ type: "user/logout", payload: response.request.responseURL });
  };
}

export function currentTemplateChanged(id) {
  return async function currentTemplateChanged(dispatch, getState) {
    dispatch({ type: "user/temaplteChanged", payload: id });
    // let rails know
    const response = await Request.get(`/calendar/${id}`);
  };
}
