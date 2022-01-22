import {SetUserProfileType} from "../profile/profileActions";
import {setErrorAC, SetErrorActionType} from "../Error/errorReducer";

export const LOGIN_LOADING = "LOGIN/LOADING";
export const LOGIN_ERROR = "LOGIN/ERROR";
export const LOGIN_SUCCESS = "LOGIN/SUCCESS";

export const loginSuccess = (): LoginSuccessType => ({
    type: LOGIN_SUCCESS,
});
export const loginError = (
    error: string,
    isLoggedIn: boolean
): LoginErrorType => ({
    type: LOGIN_ERROR,
    error,
    isLoggedIn,
});

//types
type LoginSuccessType = {
    type: typeof LOGIN_SUCCESS;
};
type LoginErrorType = {
    type: typeof LOGIN_ERROR;
    error: string;
    isLoggedIn: boolean;
};

export type LoginActions =
    | LoginSuccessType
    | SetUserProfileType
    | LoginErrorType
    | SetErrorActionType

