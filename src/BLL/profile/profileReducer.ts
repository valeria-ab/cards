import { UserDomainType } from "../../DAL/api";

const initialState = {
  _id: "",
  email: "",
  name: "",
  avatar: "",
  publicCardPacksCount: 0,
  created: "",
  updated: "",
  isAdmin: false,
  verified: false,
  rememberMe: false,
  error: "",
  token: "",
  tokenDeathTime: 0,
  __v: 0,
};

export const profileReducer = (
  state: InitialProfileStateType = initialState,
  action: ActionsType
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

export const setUserProfile = (userData: UserDomainType) =>
  ({ type: "ProfilePage/SET_USER_PROFILE", userData } as const);

//types

export type SetAppStatusActionType = SetUserProfileType;

export type SetUserProfileType = ReturnType<typeof setUserProfile>;

type ActionsType = SetAppStatusActionType;
export type InitialProfileStateType = typeof initialState;
