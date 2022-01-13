import { UserDomainType } from "../../DAL/api";

export const setUserProfile = (userData: UserDomainType) =>
  ({ type: "ProfilePage/SET_USER_PROFILE", userData } as const);

//types
export type SetAppStatusActionType = SetUserProfileType;

export type SetUserProfileType = ReturnType<typeof setUserProfile>;

export type ProfileActions = SetAppStatusActionType;
