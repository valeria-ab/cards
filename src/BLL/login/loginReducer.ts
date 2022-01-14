import { LoginActions, LOGIN_ERROR, LOGIN_SUCCESS } from "./loginActions";
import { loginInitialState } from "./loginInitialState";

export const loginReducer = (
  state = loginInitialState,
  action: LoginActions
) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return { ...state, isLoggedIn: true };
    }
    case LOGIN_ERROR: {
      return { ...state, isLoggedIn: action.isLoggedIn, error: action.error };
    }
    default: {
      return state;
    }
  }
};
