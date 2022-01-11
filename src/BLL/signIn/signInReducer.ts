import { signInInitialState } from "./signInInitialState";
import { SignInActions, SIGN_IN_SUCCESS } from "./signInActions";

export const signInReducer = (
  state = signInInitialState,
  action: SignInActions
) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS: {
      return { ...state, isLoggedIn: true };
    }
    default: {
      return state;
    }
  }
};
