import { SetUserProfileType } from "../profile/profileReducer";

export const SIGN_IN_LOADING = "SIGN_IN/LOADING";
export const SIGN_IN_ERROR = "SIGN_IN/ERROR";
export const SIGN_IN_SUCCESS = "SIGN_IN/SUCCESS";

type SignInSuccessType = {
  type: typeof SIGN_IN_SUCCESS;
};
type SignInErrorType = {
  type: typeof SIGN_IN_ERROR;
  error: string;
};

export type SignInActions =
  | SignInSuccessType
  | SetUserProfileType
  | SignInErrorType;

export const signInSuccess = (): SignInSuccessType => ({
  type: SIGN_IN_SUCCESS,
});
export const signInError = (error: string): SignInErrorType => ({
  type: SIGN_IN_ERROR,
  error,
});
