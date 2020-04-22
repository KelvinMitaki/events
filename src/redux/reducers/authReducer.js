import { LOGIN_USER, LOGOUT_USER } from "./utils/ActionConstants";

const INITIAL_STATE = {
  authenticated: false,
  currentUser: null,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        authenticated: true,
        currentUser: action.payload.email,
      };
    case LOGOUT_USER:
      return { ...state, authenticated: false, currentUser: null };
    default:
      return state;
  }
};
