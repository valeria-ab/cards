import { signInInitialState } from "./signInInitialState";
import { SignInActions, SIGN_IN_ERROR, SIGN_IN_SUCCESS } from "./signInActions";

export const signInReducer = (
  state = signInInitialState,
  action: SignInActions
) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS: {
      return { ...state, isLoggedIn: true };
    }
    case SIGN_IN_ERROR: {
      return { ...state, isLoggedIn: false, error: action.error };
    }
    default: {
      return state;
    }
  }
};
