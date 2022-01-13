import { ProfileActions } from "./profileActions";
import {
  initialProfileState,
  InitialProfileStateType,
} from "./profileInitialState";

export const profileReducer = (
  state: InitialProfileStateType = initialProfileState,
  action: ProfileActions
): InitialProfileStateType => {
  switch (action.type) {
    case "ProfilePage/SET_USER_PROFILE": {
      return {
        ...state,
        ...action.userData,
      };
    }

    default:
      return state;
  }
};
